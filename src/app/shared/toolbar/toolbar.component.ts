import { Component } from '@angular/core';
import { UserService } from 'app/shared/user/user.service';
import { LeaderService } from 'app/shared/leader';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getLoggedIn, AuthState } from '../../state/reducers/auth.reducers';
import * as appVersion from '../../app-version.json';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'app-bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent {

  public appVersion = appVersion['app-version'];

  get leaderId() {
    // FIXME NGRX IT
    return this.leaderService.leader && this.leaderService.leader._id;
  }

  // FIXME USE_NGRX
  // Show if user has got a logged in Leader
  get hasAuthenticatedLeader() {
    return this.userService.authenticated() && this.userService.hasLeader();
  };

  constructor(
    public userService: UserService,
    public leaderService: LeaderService,
    private store: Store<AuthState>
  ) {
  }

  // TODO REMOVE AFTER TEST
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
