import {Component, Input, OnInit} from '@angular/core';
import {LeaderModel} from '../../shared/leader/leader.model';
import {Router, ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {ILeaderState, getSelectedLeader} from '../../state/reducers/leader.reducers';
import {LoadLeader, DeleteLeader, SelectLeader} from '../../state/actions/leader.actions';
import {ILeader} from '../../common/models';
import {UserService} from '../../shared/user/user.service';

@Component({
  selector: 'app-leader-view',
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss']
})

export class LeaderViewComponent implements OnInit {

  // Leader object to be used in template
  public leader: ILeader = new LeaderModel();

  // Whether it has visual like image or video or it hasn't
  hasVisual = false;

  @Input() set leaderId(id: string) {
    this.setupLeader(id);
  };

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private leaderStore: Store<ILeaderState>
  ) {
  }

  /**
   * Initialization Event Handler, parses route params like `id` in leader/:id/edit)
   */
  public ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.setupLeader(params.id);
      }
    });
    this.leaderStore.select(getSelectedLeader).subscribe(leader => this.setLeader(leader));
  }

  /**
   * Leader loading handler
   * @param {data} data ILeader loaded leader data
   */
  private setLeader(data: ILeader) {
    if (!data) {
      return;
    }
    // FIXME workaround for leaderFiles: [null] sometimes coming from DB:
    if (data.leaderFiles && data.leaderFiles.length) {
      const nullIndex = data.leaderFiles.indexOf(null);
      console.warn(`Fixing null index:${nullIndex}`, data);
      data.leaderFiles.splice(nullIndex, 1);
    }
    this.leader = data;
    this.hasVisual = !!(this.leader && (this.leader.photo || this.leader.videoUrl));
  }

  /**
   * Edits the leader
   * @param {leader} leader ILeader to delete
   */
  public editLeader(leader: ILeader) {
    this.router.navigate([`/leader/${leader._id}/edit`]);
    return false;
  }

  /**
   * Removes the leader from DB
   * @param {leader} leader Leader to delete
   */
  public deleteLeader(leader: ILeader) {
    this.leaderStore.dispatch(new DeleteLeader(leader));
    return false;
  }

  private setupLeader(id) {
    this.leaderStore.dispatch(new SelectLeader(id));
    this.leaderStore.dispatch(new LoadLeader(id));
  }
}
