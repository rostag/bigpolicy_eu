import { Component, Output, OnInit } from '@angular/core';
import { LeaderService } from '../../shared/leader/index';
import { DonateComponent } from '../../shared/donate/donate.component';
import { UserService } from '../../shared/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ILeadersState, getSelectedLeader, getLeaders, getLeadersState } from '../../state/reducers/leaders.reducers';
import { SelectLeader, LoadLeadersSuccess } from '../../state/actions/leaders.actions';
import { ILeader } from '../../common/models';

@Component({
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss']
})

export class LeaderViewComponent implements OnInit {

  leader: ILeader;

  // Whether it has visual like image or video or it hasn't
  hasVisual = false;


  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    private leadersStore: Store<ILeadersState>
  ) {
    this.leadersStore.pipe(select(getLeadersState))
      .subscribe((ls: ILeadersState) => {
        console.log('View: Got Leader from Reducer:', ls, ls.leadersById[ls.selectedLeaderId]);
        this.setLeader(ls.leadersById[ls.selectedLeaderId]);
      });
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.leadersStore.dispatch(new SelectLeader(id));
          // In some circumstnaces run it
          this.leaderService.getLeader(id)
            .subscribe(
              data => {
                // this.setLeader(data);
              },
              err => console.error(err),
              () => { }
            );
        }
      });
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data: ILeader) {
    if (!data) {
      return;
    }
    // console.log(`Got Leader: ${JSON.stringify(data, null, ' ')}`);

    // fix for leaderFiles: [null] sometimes coming from DB:
    if (data.leaderFiles && data.leaderFiles.length) {
      const nullIndex = data.leaderFiles.indexOf(null);
      console.warn('Fixing null index:', nullIndex, data);
      data.leaderFiles.splice(nullIndex, 1);
    }
    this.leader = data;
    this.hasVisual = !!(this.leader && (this.leader.photo || this.leader.videoUrl));
  }

  /**
   * Removes the leader from DB
   * @param {leader} Leader to delete
   */
  deleteLeader(leader: ILeader) {
    this.leaderService.deleteLeader(leader);
    return false;
  }
}
