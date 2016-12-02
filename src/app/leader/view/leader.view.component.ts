import { Component } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss'],
  providers: [LeaderService, UserService]
})

export class LeaderViewComponent {

  leader: LeaderModel = new LeaderModel()

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    private user: UserService
  ){}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('View Leader by ID from route params:', id)
        if (id) {
          this.leaderService.getLeader(id)
          .subscribe(
            data => {
              this.setLeader(data)
            },
            err => console.error(err),
            () => {}
          )
        }
      })
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data){
    console.log('got leader: ', data);
    this.leader = data;
  }

  /**
   * Remove this leader
   * @param {leader} Leader being viewed
   */
  private deleteLeader(leader: LeaderModel) {
    // Delete from DB
    this.leaderService.deleteLeader(leader)

    this.router.navigate(['/leaders'])
    return false;
  }
}
