import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ProjectService } from '../project';
import { LeaderService, LeaderModel } from '../leader';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class UserService {

  // Configure Auth0
  options = {
      auth: {
          redirectUrl: location.protocol + '//' + location.hostname + ':' + location.port,
          responseType: 'token'
          // params: {
          //     state: '[your_state_value]',
          //     scope: 'openid user_id name nickname email picture'
          // }
      }
  };

  lock = new Auth0Lock('IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J', 'bigpolicy.eu.auth0.com', this.options);

  // Store profile object in auth class
  userProfile: any = {
      name: '',
      email: ''
  };

  leader: LeaderModel = new LeaderModel();

  constructor(
    public projectService: ProjectService,
    public leaderService: LeaderService
  ) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this.requestLeader(this.getEmail());

    // Add callback for the Lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // console.log('Authenticated, lock.showSignin =', this.lock.showSignin);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        this.requestLeader(this.getEmail());
      });
    });
  };

  /**
   * Finds the leader in DB.
   * If found, associates it with user.
   */
  public requestLeader(email) {
    console.log('User Service, Get Leader by Email: ', email);

    this.leaderService.getLeaderByEmail(email,
      ( leader ) => {
        console.log('User Service, Got Leader: ', leader );
        this.leader = leader;
      }
    );
  }

  public getLeader() {
    return this.leader;
  }

  public isLeader() {
    return !!this.getLeader();
  }

  public isCurrentUser(leaderProjectOrTask) {
    // FIXME it's being called too often, as log below shows
    return this.isOwner(leaderProjectOrTask);
  }

  public hasEditPermissions(leaderProjectOrTask) {
    // FIXME it's being called too often, as log below shows
    return this.isAdmin() || this.isOwner(leaderProjectOrTask);
  }

  public getEmail(): string {
    return this.userProfile && this.userProfile['email'];
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in local storage with key == 'id_token'
    return tokenNotExpired();
  };

  private isAdmin() {
    return this.authenticated() && this.getEmail() === 'rostislav.siryk@gmail.com';
  }

  private isOwner(item) {
    const userEmail = this.getEmail() || '';

    const isLeaderOwnedBy = userEmail === item['managerEmail'];
    const isProjectOwnedBy = userEmail === item['email'];
    const isTaskOwnedBy = item['projectId'] && userEmail === ProjectService.getCachedProject(item['projectId'])['managerEmail'];

    return this.authenticated() && ( isTaskOwnedBy || isProjectOwnedBy || isLeaderOwnedBy );
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public logout() {
    // Remove token from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };

}
