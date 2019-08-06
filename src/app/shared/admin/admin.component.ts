import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaderService } from '../leader/leader.service';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

  adminLeader;
  subscription: Subscription;

  constructor(
    public leaderService: LeaderService,
    public userService: UserService
  ) {}

  ngOnInit() {
    // FIXME NGRX IT
    this.subscription = this.leaderService.leaderStream
      .subscribe(item => {
        console.log('AdminComponent. Set leader:', item);
        this.adminLeader = item;
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
