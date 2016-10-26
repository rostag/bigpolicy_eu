import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LeaderService, LeaderModel } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';

@Component({
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.css'],
  providers: [LeaderService]
  })

export class LeaderEditComponent {

  private leader: LeaderModel = new LeaderModel();

  private isUpdateMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderService: LeaderService,
    private userService: UserService
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    var p = this.userService.userProfile;
    let fullname = p ? p['name'] : '';
    this.leader.name = fullname.split(' ')[0];
    this.leader.surName = fullname.split(' ')[1];
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('Leader Editor by ID from route params:', id)
        if (id) {
          this.isUpdateMode = true;
          this.leaderService.getLeader(id)
          .subscribe(
            data => {
              this.setLeader(data)
            },
            err => console.error(err),
            () => {}
          )
        }
      });
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data){
    this.leader = new LeaderModel()
    this.leader.parseData(data)
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

  /**
   * Saves new or edited leader by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Leader processing
  saveLeader(): boolean {
    if (this.isUpdateMode) {
      // Update existing leader:
      this.leaderService.updateLeader(this.leader)
      .subscribe(
        data => { this.gotoLeader(data) },
        err => (err) => console.error('Leader update error: ', err),
        () => {}
      )
    } else {
      // Create new leader
      // let n = this.userService.userProfile['name'].split(' ');
      this.leader.email = this.userService.userProfile['email'];
      this.leaderService.createLeader(this.leader)
      .subscribe(
        data => { this.gotoLeader(data) },
        err => (err) => console.error('Leader creation error: ', err),
        () => {}
      )
    }
    return false
  }

  gotoLeader(leader){
    var leaderId = leader._id
    if (leaderId) {
      this.router.navigate(['/leader', leaderId]).then(_ => {
        //navigation is done
      });
    }
  }
}
