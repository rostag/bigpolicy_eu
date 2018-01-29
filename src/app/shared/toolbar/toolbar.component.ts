import { Component } from '@angular/core';
import { UserService } from 'app/shared/user/user.service';
import { LeaderService } from 'app/shared/leader';
import { AuthService } from 'app/auth/auth.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'app-bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent {

  get leaderId() {
    return this.leaderService.leader && this.leaderService.leader._id;
  }

  // FIXME USE_NGRX
  // Show if user has got a logged in Leader
  get hasAuthenticatedLeader() {
    return this.userService.authenticated() && this.userService.hasLeader();
  };

  constructor(
    public auth: AuthService, 
    public userService: UserService, 
    public leaderService: LeaderService
  ) { }

  public ping() {
    this.leaderService.ping().subscribe();
  }
  public pingJwt() {
    this.leaderService.pingJwt().subscribe();
  }
  public pingJwtAdmin() {
    this.leaderService.pingJwtAdmin().subscribe();
  }
}
