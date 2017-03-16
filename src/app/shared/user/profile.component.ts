import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaderService } from '../leader';
import { UserService } from '.';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  profileLeader;
  subscription: Subscription;

  constructor(
    public leaderService: LeaderService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.subscription = this.leaderService.leaderStream
      .subscribe(item => {
        this.profileLeader = item;
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
