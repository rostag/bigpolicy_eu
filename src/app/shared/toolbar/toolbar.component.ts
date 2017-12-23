import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { LeaderService } from '../leader';
import { Subscription } from 'rxjs/Subscription';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'app-bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

 // Show if user haven't got a Leader or anonymous
 showCreateLeaderButton;

 // Show if user have got a Leader
 showCreateProjectButton;

 subscription: Subscription;

 constructor(
   public userService: UserService,
   public leaderService: LeaderService
 ) {}

 ngOnInit() {
   this.subscription = this.leaderService.leaderStream
     .subscribe(item => {
       // FIXME - force update after User Login / Logout
       console.log('Navbar: show Create Leader Button =', this.showCreateLeaderButton,
       'showCreateProjectButton = ', this.showCreateProjectButton );
       this.showCreateLeaderButton = !this.userService.hasLeader();
       this.showCreateProjectButton = this.userService.hasLeader() && this.userService.authenticated();
     });
 }

 ngOnDestroy() {
   // prevent memory leak when component is destroyed
   this.subscription.unsubscribe();
 }
}
