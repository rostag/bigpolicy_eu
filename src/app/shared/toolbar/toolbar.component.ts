import {Component, OnInit} from '@angular/core';
import {UserService} from 'app/shared/user/user.service';
import {LeaderService} from 'app/shared/leader/leader.service';
import {AuthState, IUserProfile, selectUserProfile} from '../../state/reducers/auth.reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseUnsubscribe} from '../base-unsubscribe/base.unsubscribe';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'app-bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent extends BaseUnsubscribe implements OnInit {

  public userProfile: IUserProfile;

  get leaderId() {
    // FIXME NGRX IT
    return this.leaderService.leader && this.leaderService.leader._id;
  }

  // FIXME USE_NGRX
  // Show if user has got a logged in Leader
  get hasAuthenticatedLeader() {
    return this.userService.authenticated() && this.userService.hasLeader();
  };

  private userProfile$: Observable<IUserProfile> = this.store.pipe(
    takeUntil(this.unsubscribe),
    select(selectUserProfile)
  );

  constructor(
    public userService: UserService,
    public leaderService: LeaderService,
    private store: Store<AuthState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    });
  }
}
