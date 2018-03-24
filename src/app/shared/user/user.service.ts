import Auth0Lock from 'auth0-lock';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ProjectService } from '../project';
import { LeaderService, LeaderModel } from '../leader';
import { DialogService } from '../dialog/dialog.service';
import { environment } from '../../../environments/environment';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Avoid name not found warnings in tests
declare var localStorage: any;
declare var window: any;

interface AppState {
  count: number;
}

@Injectable()
export class UserService {

  userProfile$: Observable<{}>;
  count$: Observable<{}>;
  // Store profile object in auth class
  userProfile: any = {
    name: '',
    email: ''
  };

  // Configure Auth0
  // 1. Redirect to Leader creation if user was in the process of creation
  // 2. E.T.C.
  // FIXME Redirect user to target page, not just Home
  options = {
    auth: {
      redirectUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/profile',
      responseType: 'token'
      // language: 'ua'
      // params: {
      //     state: '[your_state_value]',
      //     scope: 'openid user_id name nickname email picture'
      // }
    }
  };

  // FIXME_SEC
  lock = new Auth0Lock('IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J', 'bigpolicy.eu.auth0.com', this.options);

  constructor(
    public leaderService: LeaderService,
    public projectService: ProjectService,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {

    this.count$ = store.pipe(select('count'));
    this.userProfile$ = store.pipe(select('userProfile'));

    // FIXME this.userProfile = auth.userProfile;
    console.log('environment:', environment);
    // Set userProfile attribute of already saved profile
    if (this.authenticated()) {
      console.log('UserService: Authenticated.');
      // this.showStatus();
      this.userProfile = JSON.parse(localStorage.getItem('BigPolicyProfile'));
      this.leaderService.requestLeaderByEmail(this.getEmail());
    }

    // Add callback for the Lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      // Auth data
      localStorage.setItem('id_token', authResult.idToken);

      console.log('Authenticated, authResult =', authResult);

      const profile = authResult.idTokenPayload;

      localStorage.setItem('BigPolicyProfile', JSON.stringify(profile));
      this.userProfile = profile;

      this.leaderService.requestLeaderByEmail(this.getEmail())
        .subscribe( leaderResponse => {
          console.log('UserService: gotLeaderByEmail:', leaderResponse);
          this.showStatus();
          this.tryToContinueLeaderRegistration();
        }
        );
    });
  };

  public showStatus() {
    const status =
      `Email: ` + this.getEmail() +
      `\nAuthenticated: ` + this.authenticated() +
      `\nHas Leader: ` +  this.hasLeader() +
      `\nIs Admin: ` +  this.isAdmin() +
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
    return this.isAdmin() || this.isOwner(leaderProjectOrTask);
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
    return tokenNotExpired('id_token');
  };

  /**
   * Returns true if user is logged in and his admin is in the admin list.
   */
  // FIXME Implement Admins list
  public isAdmin() {
    // FIXME_SEC
    // const isDevMode = environment.production === false;
    // FIXME Move this setting to enviromnent ngrx
    const isDevMode = false;
    return isDevMode || (this.authenticated() && (
      this.getEmail() === 'rostyslav.siryk@gmail.com' ||
      this.getEmail() === 'prokopenko.serhii@gmail.com' ||
      this.getEmail() === 'vlodkozak@gmail.com'
    ));
  }

  // FIXME_TEST In the first place
  /**
   * Returns true if current user is owner of given leader, project or task by email
   */
  public isOwner(item) {
    const userEmail = this.getEmail() || '';

    const projectIsOwnedBy = userEmail === item['managerEmail'] && this.hasLeader();
    const leaderIsOwnedBy = userEmail === item['email'];
    const taskIsOwnedBy = item['projectId'] && userEmail === ProjectService.getCachedProject(item['projectId'])['managerEmail'];

    return this.authenticated() && ( taskIsOwnedBy || projectIsOwnedBy || leaderIsOwnedBy );
  }

  /**
   * Call the Auth0 show method to display the login widget.
   */
  public login() {
    // FIXME_SEC
    this.lock.show();
  };

  /**
   * De-authenticates currently logged in user by removing token from local storage.
   */
  public logout() {
    // Auth0 data
    localStorage.removeItem('id_token');
    localStorage.removeItem('BigPolicyProfile');
    localStorage.removeItem('BigPolicyLeaderRegistration');
    this.userProfile = undefined;
  };

  // FTUX

  /**
  * Lazy Leader Registration.
  * Save Leader to LocalStorage to let unauthorised user to start registration
  */
  needToLoginFirst(leader: LeaderModel) {
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
    const localLeader = localStorage.getItem('BigPolicyLeaderRegistration');
    if (this.authenticated() && !this.hasLeader() && !!localLeader) {

      const leader = new LeaderModel();
      leader.parseData(JSON.parse(localLeader));
      console.log('FTUX: continue leader registration, parsed leader: ', leader);

      // on registration success
      this.dialogService
        .confirm('Вітаємо!', 'Ти успішно завершив реєстрацію в системі.')
        .subscribe(res => {
          this.leaderService.createLeader(leader, this.getEmail());
        });
    } else {
      // on registration failure — leader with that email is registered already
      if (!!localLeader) {
        this.dialogService
          .confirm('Існуючий користувач?', 'Лідера з таким email вже зареєстровано в системі. \n\nЗдається, це ти!')
          .subscribe(res => {
            console.log('FTUX: DON\'t continue leader registration: ', this.authenticated(), this.hasLeader(), localLeader);
            // Cleanup
            localStorage.removeItem('BigPolicyLeaderRegistration');
          });
      } else {
        this.dialogService
          .confirm('Вітаємо!', 'Ти успішно увійшов у систему.')
          .subscribe(res => {
            console.log('Logged in: ', this.authenticated(), this.hasLeader(), localLeader);
          });
      }
    }
  }
}
