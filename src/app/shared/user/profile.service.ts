import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { LocalStorage } from '../localstorage/LocalStorage';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    public userService: UserService,
    private http: Http
  ) {}

  getProfile() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/profile', { headers })
      .map(res => res.json());
  }
}
