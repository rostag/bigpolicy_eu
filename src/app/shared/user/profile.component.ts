import {AuthState, IUserProfile, selectUserProfile} from '../../state/reducers/auth.reducers';
import {getSelectedLeader} from '../../state/reducers/leader.reducers';
import {BaseUnsubscribe} from '../base-unsubscribe/base.unsubscribe';
import {LeaderService} from '../leader/leader.service';
import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {ILeader} from '../models';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent extends BaseUnsubscribe implements OnInit {

  public userProfile: IUserProfile;

  private userProfile$: Observable<IUserProfile> = this.store.pipe(
    takeUntil(this.unsubscribe),
    select(selectUserProfile)
  );

  private leader$: Observable<ILeader> = this.store.pipe(
    takeUntil(this.unsubscribe),
    select(getSelectedLeader)
  );

  public profileLeader: ILeader;

  constructor(
    public leaderService: LeaderService,
    public userService: UserService,
    private store: Store<AuthState>
  ) {
    super();
  }

  ngOnInit() {
    this.userProfile$.subscribe(userProfile => this.userProfile = userProfile);
    this.leader$.subscribe(leader => this.profileLeader = leader);
  }

  public pingJwt() {
    this.leaderService.pingJwt().subscribe();
  }

  public pingJwtAdmin() {
    this.leaderService.pingJwtAdmin().subscribe();
  }
}
