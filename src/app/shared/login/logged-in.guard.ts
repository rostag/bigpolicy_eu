import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

/**
 * Restricting access to logged in users only, having token stored locally
 */

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate() {
    return this.userService.authenticated();
  }
}
