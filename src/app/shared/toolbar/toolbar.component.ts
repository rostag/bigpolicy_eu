import {Component, OnInit} from '@angular/core';
import {UserService} from 'app/shared/user/user.service';
import {AuthState, IUserProfile, selectUserProfile} from '../../state/reducers/auth.reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseUnsubscribe} from '../base-unsubscribe/base.unsubscribe';
import {getSelectedLeader, ILeaderState} from '../../state/reducers/leader.reducers';
import {ILeader} from '../models';

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
  public leader: ILeader;

  get leaderId() {
    return this.leader && this.leader._id;
  }

  // FIXME NGRX IT
  // Show if user has got a logged in Leader
  get hasAuthenticatedLeader() {
    return this.userService.authenticated() && this.userService.hasLeader;
  };

  private userProfile$: Observable<IUserProfile> = this.store.pipe(
    takeUntil(this.unsubscribe),
    select(selectUserProfile)
  );

  private leader$: Observable<ILeader> = this.leaderStore.pipe(
    takeUntil(this.unsubscribe),
    select(getSelectedLeader)
  );

  constructor(
    public userService: UserService,
    private store: Store<AuthState>,
    private leaderStore: Store<ILeaderState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(userProfile => this.userProfile = userProfile);
    this.leader$.subscribe(leader => this.leader = leader);
  }
}
