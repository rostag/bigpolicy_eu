import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { LeaderService } from 'app/shared/leader';

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

  constructor(public userService: UserService, public leaderService: LeaderService) { }
}
