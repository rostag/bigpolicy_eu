// import Auth0Lock from 'auth0-lock';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ProjectService } from '../project';
import { LeaderService, LeaderModel } from '../leader';
import { DialogService } from '../dialog/dialog.service';
import { environment } from '../../../environments/environment';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthState, getUserProfile, IUserProfile } from '../../state/reducers/auth.reducers';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';
import { LoginSuccess, Logout } from '../../state/actions/auth.actions';
import { ILeader } from '../../common/models';

// Avoid name not found warnings in tests
declare var localStorage: any;
declare var window: any;

interface AppState {
  count: number;
}

@Injectable()
export class UserService {

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
  userProfile: any = {
    name: '',
    email: ''
  };

  // TODO Move to NGRX
  isAdmin: boolean;

  constructor(
    public leaderService: LeaderService,
    public projectService: ProjectService,
    private dialogService: DialogService,
    private store: Store<AuthState>,
    private router: Router
  ) {
    this.store.pipe(select(getUserProfile)).subscribe(profile => this.userProfile = profile);
    // If authenticated, set local profile property
    // and update login status subject.
    // If not authenticated but there are still items
    // in localStorage, log out.
    const lsProfile = localStorage.getItem('profile');
    const lsIsAdmin = localStorage.getItem('isAdmin');

    if (this.tokenValid) {
      this.userProfile = JSON.parse(lsProfile);
      this.isAdmin = lsIsAdmin === 'true';
      this.setLoggedIn(true);
      this.leaderService.requestLeaderByEmail(this.getEmail());
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }
  }

  private setLoggedIn(toLogin: boolean, userProfile: IUserProfile = null) {
    // Update login status subject
    // FIXME NGRX
    // this.loggedIn$.next(value);
    // this.loggedIn = value;
    if (toLogin) {
      this.store.dispatch(new LoginSuccess(userProfile));
    } else {
      this.store.dispatch(new Logout());
    }
  }

  login() {
    this._auth0.authorize();
  }

  handleAuth() {
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

  /**
   * Returns true if user has admin role.
   */
  private _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf('admin') > -1;
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    // Set tokens and expiration in localStorage and props
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;

    // Save admin data
    this.isAdmin = this._checkAdmin(profile);
    localStorage.setItem('isAdmin', this.isAdmin.toString());

    // Update login status in loggedIn$ stream
    this.setLoggedIn(true, profile);

    // Was
    console.log('Authenticated, authResult =', authResult);
    this.leaderService.requestLeaderByEmail(this.getEmail())
      .subscribe(leaderResponse => {
        console.log('UserService: gotLeaderByEmail:', leaderResponse);
        this.showStatus();
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

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  // Was

  public showStatus() {
    const status =
      `Email: ` + this.getEmail() +
      `\nAuthenticated: ` + this.authenticated() +
      `\nHas Leader: ` + this.hasLeader() +
      `\nIs Admin: ` + this.isAdmin +
      `\nSaved registration: ` + localStorage.getItem('BigPolicyLeaderRegistration');
    console.log('User status: ' + status);
    console.log('Leader:', this.leaderService.leader);
  }

  /**
   * Returns true if leader matching by email has been found in DB
   */
  public hasLeader() {
    return !!this.leaderService.leader;
  }

  public hasEditPermissions(leaderProjectOrTask) {
    // FIXME it's being called too often, as log below shows
    return this.isAdmin || this.isOwner(leaderProjectOrTask);
  }

  /**
   * Returns email of logged in user.
   */
  public getEmail(): string {
    return this.userProfile && this.userProfile['email'];
  }

  /**
   * Returns true if user is logged in.
   * Check if there's an unexpired JWT, by finding a local storage item with key == 'id_token'
   */
  public authenticated() {
    // FIXME Move to using ngrx/store
    // return tokenNotExpired('id_token');
    return this.tokenValid;
  };

  // FIXME_TEST In the first place
  /**
   * Returns true if current user is owner of given leader, project or task by email
   */
  public isOwner(item) {
    const userEmail = this.getEmail() || '';

    if (!userEmail || !item) {
      return false;
    }

    const projectIsOwnedBy = userEmail === item['managerEmail'] && this.hasLeader();
    const leaderIsOwnedBy = userEmail === item['email'];
    const taskIsOwnedBy = item['projectId'] && userEmail === ProjectService.getCachedProject(item['projectId'])['managerEmail'];

    return this.authenticated() && (taskIsOwnedBy || projectIsOwnedBy || leaderIsOwnedBy);
  }

  // FTUX

  /**
  * Lazy Leader Registration.
  * Save Leader to LocalStorage to let unauthorised user to start registration
  */
  needToLoginFirst(leader: ILeader) {
    if (!this.authenticated()) {

      // save Leader data to LocalStorage
      console.log('≥≥≥ unauthorised, saving to localStorage');
      localStorage.setItem('BigPolicyLeaderRegistration', leader.toString());

      // show Registration is needed warning
      this.dialogService
        .confirm('Потрібна авторизація', 'Для завершення реєстрації треба увійти в систему. Будь ласка, натиcни "Продовжити"')
        .subscribe(res => {
          console.log('Заходимо у систему');
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
    if (this.authenticated() && !this.hasLeader() && !!lsRegistration) {

      const leader: ILeader = new LeaderModel();
      leader.parseData(JSON.parse(lsRegistration));
      console.log('FTUX: continue leader registration, parsed leader: ', leader);

      // on registration success
      this.dialogService
        .confirm('Вітаємо!', 'Ти успішно завершив реєстрацію в системі.')
        .subscribe(res => {
          this.leaderService.createLeader(leader, this.getEmail());
        });
    } else {
      // on registration failure — leader with that email is registered already
      if (!!lsRegistration) {
        this.dialogService
          .confirm('Існуючий користувач?', 'Лідера з таким email вже зареєстровано в системі. \n\nЗдається, це ти!')
          .subscribe(res => {
            console.log('FTUX: DON\'t continue leader registration: ', this.authenticated(), this.hasLeader(), lsRegistration);
            // Cleanup
            localStorage.removeItem('BigPolicyLeaderRegistration');
          });
      } else {
        this.dialogService
          .confirm('Вітаємо!', 'Ти успішно увійшов у систему.')
          .subscribe(res => {
            console.log('Вітаємо!', 'Ти успішно увійшов у систему: ', this.authenticated(), this.hasLeader());
          });
      }
    }
  }

}
