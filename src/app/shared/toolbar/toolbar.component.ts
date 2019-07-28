import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from 'app/shared/user/user.service';
import { LeaderService } from 'app/shared/leader/leader.service';
import * as appVersion from '../../../../package.json';
import {AuthState, IUserProfile, selectUserProfile} from '../../state/reducers/auth.reducers';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'app-bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public appVersion = appVersion['version'];
  public userProfile: IUserProfile;

  unsubscribe: Subject<any> = new Subject();

  get leaderId() {
    // FIXME NGRX IT
    return this.leaderService.leader && this.leaderService.leader._id;
  }

  // FIXME USE_NGRX
  // Show if user has got a logged in Leader
  get hasAuthenticatedLeader() {
    return this.userService.authenticated() && this.userService.hasLeader();
  };

  public userProfile$: Observable<IUserProfile> = this.store.pipe(
    select(selectUserProfile),
    takeUntil(this.unsubscribe)
  );

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

  ngOnInit(): void {
    this.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
