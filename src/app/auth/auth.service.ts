// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  isAdmin: boolean;
  userProfile: any;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });

  constructor(private router: Router) {
    const lsProfile = localStorage.getItem('profile');

    // If authenticated, set local profile property,
    // admin status, and update login status subject.
    // If token is expired but user data still in localStorage, log out
    if (this.tokenValid) {
      this.userProfile = JSON.parse(lsProfile);
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
      this.setLoggedIn(true);
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
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
      this.router.navigate(['/']);
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
    this.setLoggedIn(true);
  }

  logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    localStorage.removeItem('isAdmin');
    // Reset local properties, update loggedIn$ stream
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.setLoggedIn(false);
    // Return to homepage
    this.router.navigate(['/']);
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}
