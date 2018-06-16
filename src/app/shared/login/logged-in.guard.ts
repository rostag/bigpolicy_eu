import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

/**
 * Restricting access
 * For each route definition we can restrict access by creating a guard
 * and adding it to the canActivate property.
 */

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private userService: UserService) {}

  /**
   * Returns a boolean, but it can be also a Promise resolving to a boolean.
   */
  canActivate() {
    // FIXME NGRX
    return this.userService.authenticated();
  }
}
