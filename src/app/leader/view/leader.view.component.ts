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
  setLeader(data: LeaderModel) {
    // console.log(`Got Leader: ${JSON.stringify(data, null, ' ')}`);

    // fix for leaderFiles: [null] sometimes coming from DB:
    if (data.leaderFiles && data.leaderFiles.length) {
      const nullIndex = data.leaderFiles.indexOf(null);
      console.log('nulli:', nullIndex);
      data.leaderFiles.splice(nullIndex, 1);
    }
    this.leader = data;
  }

  /**
   * Removes the leader from DB
   * @param {leader} Leader to delete
   */
  deleteLeader(leader: LeaderModel) {
    this.leaderService.deleteLeader(leader);
    return false;
  }
}
