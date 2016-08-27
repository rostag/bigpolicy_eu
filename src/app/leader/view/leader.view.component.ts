import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_GRID_LIST_DIRECTIVES, MdCard, MdButton, MdIcon, MdToolbar],
  providers: [MdIconRegistry, LeaderService, UserService]
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
    private userService: UserService
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
