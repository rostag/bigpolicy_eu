import { Component, OnInit } from '@angular/core';
import { LeaderModel } from '../../shared/leader/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ILeaderState, getSelectedLeader } from '../../state/reducers/leader.reducers';
import { LoadLeader, DeleteLeader, SelectLeader } from '../../state/actions/leader.actions';
import { ILeader } from '../../common/models';
import { UserService } from '../../shared/user/user.service';

@Component({
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss']
})

export class LeaderViewComponent implements OnInit {

  // Leader object to be used in template
  public leader: ILeader = new LeaderModel();

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
   * Initialization Event Handler, parses route params like `id` in leader/:id/edit)
   */
  public ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.leaderStore.dispatch(new SelectLeader(params.id));
        this.leaderStore.dispatch(new LoadLeader(params.id));
      }
    });
    this.leaderStore.select(getSelectedLeader).subscribe(leader => this.setLeader(leader));
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  private setLeader(data: ILeader) {
    if (!data) { return }
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
  public editLeader(leader: ILeader) {
    this.router.navigate(['/leader/' + leader._id + '/edit']);
    return false;
  }

  /**
   * Removes the leader from DB
   * @param {leader} Leader to delete
   */
  public deleteLeader(leader: ILeader) {
    this.leaderStore.dispatch(new DeleteLeader(leader));
    return false;
  }
}
