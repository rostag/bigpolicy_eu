import { Injectable, OnDestroy } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ProjectService } from '../project';
import { LeaderService, LeaderModel } from '../leader';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class UserService {

  // Store profile object in auth class
  userProfile: any = {
    name: '',
    email: ''
  };

  // Configure Auth0
  // FIXME Redirect user to special place, not just landing
  // 1. Redirect to Leader creation if user was in the process of creation
  // 2. E.T.C.
  options = {
      auth: {
          redirectUrl: location.protocol + '//' + location.hostname + ':' + location.port + '/profile',
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
    public projectService: ProjectService,
    public leaderService: LeaderService
  ) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this.leaderService.requestLeaderByEmail(this.getEmail());

    // Add callback for the Lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // console.log('Authenticated, lock.showSignin =', this.lock.showSignin);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          console.log(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;

        this.leaderService.requestLeaderByEmail(this.getEmail())
          .subscribe( leaderResponse => {
            this.showStatus();
            this.tryToContinueLeaderRegistration();
          }
        );
      });
    });

    if (this.authenticated) {
      this.showStatus();
    }
  };

  public showStatus() {
    console.log('User service ', this.getEmail() );
    console.log('\tIs authd:', this.authenticated(), ' Is admin:', this.isAdmin());
    console.log('\tHas leader:', this.hasLeader(), '\tLeader:', this.leaderService.leader);
    console.log('\tSaved registration:', localStorage.getItem('BigPolicyLeaderRegistration'));
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
   */
  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in local storage with key == 'id_token'
    return tokenNotExpired();
  };

  /**
   * Returns true if user is logged in and his admin is in the admin list.
   */
  private isAdmin() {
    return this.authenticated() && this.getEmail() === 'rostislav.siryk@gmail.com';
  }

  /**
   * Returns true if current user is owner of given leader, project or task by email
   */
  private isOwner(item) {
    const userEmail = this.getEmail() || '';

    const projectIsOwnedBy = userEmail === item['managerEmail'] && this.hasLeader();
    const leaderIsOwnedBy = userEmail === item['email'];
    const taskIsOwnedBy = item['projectId'] && userEmail === ProjectService.getCachedProject(item['projectId'])['managerEmail'];

    return this.authenticated() && ( taskIsOwnedBy || projectIsOwnedBy || leaderIsOwnedBy );
  }

  /**
   * Call the Auth0 show method to display the login widget.
   * TODO Extend
   */
  public login() {
    // FIXME_SEC
    this.lock.show();
  };

  /**
   * De-authenticates currently logged in user by removing token from local storage.
   */
  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };

  private tryToContinueLeaderRegistration() {
    const localLeader = localStorage.getItem('BigPolicyLeaderRegistration');
    if (this.authenticated() && !this.hasLeader() && !!localLeader) {

      const leader = new LeaderModel();
      leader.parseData(JSON.parse(localLeader));
      console.log('FTUX: continue leader registration, parsed leader: ', leader);

      this.leaderService.createLeader(leader, this.getEmail());
    } else {
      console.log('FTUX: DON\'t continue leader registration: ', this.authenticated(), this.hasLeader(), localLeader);
    }
  }

  // FIXME Implement unsubscribing
  // ngOnDestroy() {
  //   console.log('UNSUB: UserService');
  //   this.subscription.unsubscribe();
  // }

}
