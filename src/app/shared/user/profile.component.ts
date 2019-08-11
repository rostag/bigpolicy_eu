import {Component, OnInit} from '@angular/core';
import {LeaderService} from '../leader/leader.service';
import {UserService} from './user.service';
import {BaseUnsubscribe} from '../base-unsubscribe/base.unsubscribe';
import {takeUntil} from 'rxjs/operators';
import {AuthState, IUserProfile, selectUserProfile} from '../../state/reducers/auth.reducers';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ILeader} from '../models';

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

  public profileLeader: ILeader = <any>{};

  constructor(
    public leaderService: LeaderService,
    public userService: UserService,
    private store: Store<AuthState>
  ) {
    super();
  }

  ngOnInit() {
    this.userProfile$.subscribe(userProfile => this.userProfile = userProfile);

    // FIXME NGRX IT LP
    this.leaderService.leaderStream.pipe(takeUntil(this.unsubscribe))
      .subscribe(item => this.profileLeader = item);
  }

  public pingJwt() {
    this.leaderService.pingJwt().subscribe();
  }

  public pingJwtAdmin() {
    this.leaderService.pingJwtAdmin().subscribe();
  }
}
