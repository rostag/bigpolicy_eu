/* ===== ./auth.service.ts ===== */
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class UserService {
  // Configure Auth0
  lock = new Auth0Lock('IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J', 'bigpolicy.eu.auth0.com', {});

  // FIXME
  // One might temporarily enable Demo mode just for fun!
  public get isDemoMode () {
    return this._isDemoMode;
  }

  public set isDemoMode ( value : boolean ) {
    this._isDemoMode = value;
  }

  private _isDemoMode = true;

  //Store profile object in auth class
  userProfile: any = {
      name: '',
      email: ''
  };

  constructor(

  ) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      console.log('got token: ', authResult.idToken);
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  };

  public hasEditPermissions() {
    // FIXME it's being called too often, as log below shows
    return this.isDemoMode || ( this.userProfile && this.userProfile['email'] === 'rostislav.siryk@gmail.com' );
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    var koten = tokenNotExpired();
    console.log('koten exiperd:', koten, tokenNotExpired);
    return koten;
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };

  public setDemoMode() {
    this.isDemoMode = true;
  }
}
