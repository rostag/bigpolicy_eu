import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { LeaderService, LeaderModel } from '../leader/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  private leader: LeaderModel = new LeaderModel();

  constructor(
    private userService: UserService,
    private leaderService: LeaderService
  ) {
    console.info('Profile constructor')
  }

  ngOnInit() {
    // Optimize, use caching, no need to load leaders eah time
    this.leaderService.getLeaders()
    .subscribe(
      data => {
        var email = this.userService.userProfile && this.userService.userProfile['email'];
        console.info('Profile got leader', email);
        this.leader = this.leaderService.getLeaderByEmail(email);
      },
      err => console.error(err),
      () => {}
    )
  }
}
