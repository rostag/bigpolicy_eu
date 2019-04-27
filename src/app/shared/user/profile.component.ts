import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaderService } from '../leader';
import { UserService } from './user.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  private _profileLeader: {};

  public get profileLeader() {
    return this._profileLeader || {};
  };

  private subscription: any;

  constructor(
    public leaderService: LeaderService,
    public userService: UserService
  ) {}

  ngOnInit() {
    // FIXME NGRX IT
    this.subscription = this.leaderService.leaderStream
      .subscribe(item => {
        console.log('ProfileComponent. Set profile leader:', item);
        this._profileLeader = item;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
