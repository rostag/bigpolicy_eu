import { Component, Output, OnInit } from '@angular/core';
import { LeaderModel } from '../../shared/leader/index';
import { DonateComponent } from '../../shared/donate/donate.component';
import { UserService } from '../../shared/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ILeaderState, getSelectedLeader } from '../../state/reducers/leader.reducers';
import { LoadLeader, DeleteLeader } from '../../state/actions/leader.actions';
import { ILeader } from '../../common/models';

@Component({
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss']
})

export class LeaderViewComponent implements OnInit {

  leader: ILeader = new LeaderModel();

  // Whether it has visual like image or video or it hasn't
  hasVisual = false;

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private leaderStore: Store<ILeaderState>
  ) { }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.leaderStore.dispatch(new LoadLeader(id));
        }
      });
    this.leaderStore.pipe(select(getSelectedLeader)).subscribe(leader => this.setLeader(leader));
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
   * Edits the leader
   * @param {leader} Leader to delete
   */
  editLeader(leader: ILeader) {
    // FIXME NGRX RESTORE
    // this.leaderService.deleteLeader(leader);
    this.router.navigate(['/leader/' + leader._id + '/edit']);
    return false;
  }

  /**
   * Removes the leader from DB
   * @param {leader} Leader to delete
   */
  deleteLeader(leader: ILeader) {
    // FIXME NGRX RESTORE
    // this.leaderService.deleteLeader(leader);
    // this.leaderStore.dispatch(new DeleteLeader(leader));
    return false;
  }
}
