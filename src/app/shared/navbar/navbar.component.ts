import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user';
import { LeaderService } from '../leader';
import { Subscription } from 'rxjs/Subscription';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'app-bp-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  showCreateLeaderButton;
  subscription: Subscription;

  constructor(
    public userService: UserService,
    public leaderService: LeaderService
  ) {}

  ngOnInit() {
    this.subscription = this.leaderService.leaderStream
      .subscribe(item => {
        console.log('Navbar: showCreateLeaderButton =', this.showCreateLeaderButton);
        this.showCreateLeaderButton = this.userService.authenticated() && !this.userService.hasLeader();
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
