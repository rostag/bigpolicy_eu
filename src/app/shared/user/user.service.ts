import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { localStorage } from '../localstorage/localStorage';

@Injectable()
export class UserService {

  private loggedIn = true;

  constructor(private http: Http) {
    console.log('auuuuu:', localStorage.getItem('auth_token'));
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {

    // By default the content type is plain/text, we need to set it to application/json
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // We get an RxJS observable object instead of a Promise.
    // As with promises we can listen to it’s result, the subscribe method
    // will take the place of the promise’s then method
    return this.http
      .post(
        '/login',
        JSON.stringify({email, password}),
        { headers }
      )
      .map( res => res.json())
      .map((res) => {
        if (res.success) {
          // Backend service generates a unique token for authentication of requests
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      })
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    console.log('Usr is logged in: ', this.loggedIn);
    return this.loggedIn;
  }

}
