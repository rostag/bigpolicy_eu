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
  ) {
    console.log('Profile constructor');
  }

  ngOnInit() {
    console.log('SUBSCRIBE: Profile:', this.profileLeader );

    this.subscription = this.leaderService.leaderStream
      .subscribe(item => {
        this.profileLeader = item;
        console.log('SUB Profile:', this.profileLeader );
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    console.log('UNSUBSCRIBE: Profile:', this.profileLeader );
    this.subscription.unsubscribe();
  }
}
