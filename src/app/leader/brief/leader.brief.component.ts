import { Component, Input, OnChanges } from '@angular/core';
import { LeaderModel } from '../../shared/leader';
import { UserService } from '../../shared/user/user.service';
import { ILeader } from '../../common/models';
import { Store } from '@ngrx/store';
import { ILeaderState, getSelectedLeader } from '../../state/reducers/leader.reducers';
import { LoadLeader } from '../../state/actions/leader.actions';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.scss']
})
export class LeaderBriefComponent implements OnChanges {

  @Input() public leaderId = '';
  @Input() public viewContext = '';
  // FIXME Get Rid of new LeaderModel(), and new TaskModel()
  @Input() public leader: ILeader = new LeaderModel();

  // Whether it has visual like image or video or it hasn't
  public hasVisual = false;

  constructor(
    public userService: UserService,
    private leaderStore: Store<ILeaderState>
  ) {
    leaderStore.select(getSelectedLeader).subscribe(leader => this.applyChanges(leader));
  }

  ngOnChanges(changes) {
    if (changes.leaderId && changes.leaderId.currentValue) {
      if (!this.leader || !this.leader._id || !this.leader.email) {
        this.requestLeader(this.leaderId);
      } else {
        this.applyChanges(this.leader);
      }
    }
  }

  private applyChanges(leader: ILeader) {
    this.leader = leader;
    this.hasVisual = !!(this.leader && (this.leader.photo || this.leader.videoUrl));
  }

  requestLeader(id) {
    this.leaderStore.dispatch(new LoadLeader(id));
  }

  public getLeaderLink(leader: ILeader) {
    if (!leader || !leader._id) {
      return null;
    } else {
      return ['/leader/', leader._id];
    }
  }
}
