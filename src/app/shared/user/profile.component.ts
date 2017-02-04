import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { LeaderService, LeaderModel } from '../leader/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  leader: LeaderModel = new LeaderModel();

  constructor(
    public userService: UserService,
    private leaderService: LeaderService
  ) {
    console.log('Profile constructor');
  }

  ngOnInit() {
    // Optimize, use caching, no need to load leaders eah time
    this.leaderService.getLeaders()
    .subscribe(
      data => {
        const email = this.userService.userProfile && this.userService.userProfile['email'];
        console.log('Profile got leader', email);
        this.leader = this.leaderService.getLeaderByEmail(email);
      },
      err => console.error(err),
      () => {}
    );
  }
}
