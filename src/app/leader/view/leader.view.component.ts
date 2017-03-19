import { Component, Output, OnInit } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { DonateComponent } from '../../shared/donate/index';
import { UserService } from '../../shared/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss']
})

export class LeaderViewComponent implements OnInit {

  leader: LeaderModel = new LeaderModel();

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private leaderService: LeaderService
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.leaderService.getLeader(id)
          .subscribe(
            data => {
              this.setLeader(data);
            },
            err => console.error(err),
            () => {}
          );
        }
      });
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data) {
    this.leader = data;
  }

  /**
   * Remove this leader
   * @param {leader} Leader being viewed
   */
  deleteLeader(leader: LeaderModel) {
    // Delete from DB
    this.leaderService.deleteLeader(leader);
    this.router.navigate(['/leaders']);
    return false;
  }
}
