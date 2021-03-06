import * as auth0 from 'auth0-js';
import {AUTH_CONFIG} from './auth.config';
import {Injectable} from '@angular/core';
import {ProjectService} from '../project/project.service';
import {LeaderModel} from '../leader/leader.model';
import {LeaderService} from '../leader/leader.service';
import {DialogService} from '../dialog/dialog.service';
import {Store, select} from '@ngrx/store';
import {AuthState, selectUserProfile, IUserProfile} from '../../state/reducers/auth.reducers';
import {Router} from '@angular/router';
import {LoginSuccess, Logout} from '../../state/actions/auth.actions';
import {ILeader} from '../models';
import {getSelectedLeader, ILeaderState} from '../../state/reducers/leader.reducers';
import {CreateLeader} from '../../state/actions/leader.actions';
import {filter, takeUntil} from 'rxjs/operators';
import {BaseUnsubscribe} from '../base-unsubscribe/base.unsubscribe';

// Avoid name not found warnings in tests
declare var localStorage: any;
declare var window: any;

@Injectable()
export class UserService extends BaseUnsubscribe {

  public hasLeader = false;

  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });

  // Store profile object in auth class
  public userProfile: IUserProfile = {
    given_name: '',
    family_name: '',
    name: '',
    email: '',
    nickname: null,
    created_at: null,
    updated_at: null,
    picture: null
  };

  // FIXME NGRX IT
  public isAdmin: boolean;

  /**
   * Returns true if user has admin role.
   */
  private static _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf('admin') > -1;
  }

  /**
   * Check if current time is past access token's expiration
   */
  private static get tokenValid(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  /**
   * Returns true if user is logged in.
   * Check if there's an unexpired JWT, by finding a local storage item with key == 'id_token'
   */
  public authenticated() {
    // FIXME NGRX IT
    return UserService.tokenValid;
  };

  constructor(
    public leaderService: LeaderService,
    public projectService: ProjectService,
    public leaderStore: Store<ILeaderState>,
    private dialogService: DialogService,
    private store: Store<AuthState>,
    private router: Router
  ) {
    super();
    this.store.pipe(select(selectUserProfile)).subscribe(profile => this.userProfile = profile);

    // If authenticated, set local profile property, and update login status subject.
    // If not authenticated, but there are still items in localStorage, log out.

    const lsProfile = localStorage.getItem('profile');
    const lsIsAdmin = localStorage.getItem('isAdmin');

    if (UserService.tokenValid) {
      this.userProfile = JSON.parse(lsProfile);
      this.isAdmin = lsIsAdmin === 'true';
      this.setLoggedIn(true, JSON.parse(lsProfile));
      // FIXME NGRX IT
      this.leaderService.requestLeaderByEmail(this.getEmail());
    } else if (!UserService.tokenValid && lsProfile) {
      this.logout();
    }

    this.handleAuth();

    this.leaderStore.pipe(
      takeUntil(this.unsubscribe),
      filter(l => !!l),
      select(getSelectedLeader))
      .subscribe((l) => {
        this.hasLeader = !!l;
      })
  }

  // It's here, not in auth.effects
  private setLoggedIn(toLogin: boolean, userProfile: IUserProfile = null) {
    if (toLogin) {
      this.store.dispatch(new LoginSuccess(userProfile));
    } else {
      this.store.dispatch(new Logout());
    }
  }

  public login() {
    this._auth0.authorize();
  }

  private handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Set tokens and expiration in localStorage and props
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;

    // Save admin data
    this.isAdmin = UserService._checkAdmin(profile);
    localStorage.setItem('isAdmin', this.isAdmin.toString());

    // Update login status in loggedIn$ stream
    this.setLoggedIn(true, profile);

    this.leaderService.requestLeaderByEmail(this.getEmail())
      .subscribe(() => {
        this.tryToContinueLeaderRegistration();
      });
  }

  /**
   * De-authenticates currently logged in user by removing token from local storage.
   */
  public logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('BigPolicyLeaderRegistration');
    // Reset local properties, update logged In $ stream
    this.userProfile = undefined;
    this.isAdmin = undefined;
    // Return to homepage
    this.router.navigate(['/']);
  }

  public canEdit(leaderProjectOrTask) {
    // FIXME it's being called too often, as log below shows
    return this.isAdmin || this.isOwner(leaderProjectOrTask);
  }

  /**
   * Returns email of logged in user.
   */
  public getEmail(): string {
    return this.userProfile && this.userProfile['email'];
  }

  // FIXME_TEST In the first place
  /**
   * Returns true if current user is owner of given leader, project or task by email
   */
  public isOwner(item) {
    const userEmail = this.getEmail() || '';

    if (!userEmail || !item) {
      return false;
    }

    const projectIsOwnedBy = userEmail === item['managerEmail'] && this.hasLeader;
    const leaderIsOwnedBy = userEmail === item['email'];
    const taskIsOwnedBy = item['projectId'] && userEmail === this.projectService.getCachedProject(item['projectId'])['managerEmail'];

    return this.authenticated() && (taskIsOwnedBy || projectIsOwnedBy || leaderIsOwnedBy);
  }

  // FTUX

  /**
   * Lazy Leader Registration.
   * Save Leader to LocalStorage to let unauthorised user to start registration
   */
  public needToLoginFirst(leader: ILeader) {
    if (!this.authenticated()) {

      // save Leader data to LocalStorage
      localStorage.setItem('BigPolicyLeaderRegistration', leader.toString());

      // show Registration is needed warning
      this.dialogService
        .confirm({
          title: 'Потрібна авторизація',
          message: 'Для завершення реєстрації треба увійти в систему. Будь ласка, натиcни "Продовжити"'
        })
        .subscribe(() => {
          this.login();
        });
      return true;
    }
    return false;
  }

  /**
   * FTUX finalizing Leader registration if needed, or just greeting the already registered one
   */
  private tryToContinueLeaderRegistration() {
    this.router.navigate(['/profile']);
    const lsRegistration = localStorage.getItem('BigPolicyLeaderRegistration');
    if (this.authenticated() && !this.hasLeader && !!lsRegistration) {

      const leader: ILeader = new LeaderModel();
      leader.parseData(JSON.parse(lsRegistration));

      // on registration success
      this.dialogService
        .confirm({title: 'Вітаємо!', message: 'Ти успішно завершив реєстрацію в системі.'})
        .subscribe(() => {
          leader.email = this.getEmail();
          this.leaderStore.dispatch(new CreateLeader(leader));
        });
    } else {
      // on registration failure — leader with that email is registered already
      if (!!lsRegistration) {
        this.dialogService
          .confirm({title: 'Існуючий користувач?', message: 'Лідера з таким email вже зареєстровано в системі. \n\nЗдається, це ти!'})
          .subscribe(() => {
            localStorage.removeItem('BigPolicyLeaderRegistration');
          });
      } else {
        this.dialogService
          .confirm({title: 'Вітаємо!', message: 'Ти успішно увійшов у систему.'})
          .subscribe(() => {
          });
      }
    }
  }
}
