import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class UserService {

  useLock: boolean;

  //Store profile object in auth class
  userProfile: Object;

  auth0 = new Auth0({
    domain: 'bigpolicy.eu.auth0.com',
    clientID: 'IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J',
    callbackOnLocationHash: true,
    callbackURL: location.origin + '/profile',
  });

  // Configure Auth0
  lock = new Auth0Lock('IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J', 'bigpolicy.eu.auth0.com', {});

  constructor(private router: Router) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    if (this.useLock) {
      // Add callback for lock `authenticated` event
      this.lock.on("authenticated", (authResult) => {
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
      return
    }

    // Custom Login
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(username, password) {
    // Call the show method to display the widget.
    if (this.useLock) {
      this.lock.show();

    } else {
      // Custom Login
      this.auth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password,
      }, function(err) {
        if (err) alert("something went wrong: " + err.message);
      });
    }
  };

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  };

  public signUp(username, password) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };
}
