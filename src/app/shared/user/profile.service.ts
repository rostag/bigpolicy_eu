import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { localStorage } from '../localstorage/localStorage';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private http: Http,
    private userService: UserService
  ) {}

  getProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/profile', { headers })
      .map(res => res.json());
  }
}
