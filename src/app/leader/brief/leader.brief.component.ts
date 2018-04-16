import { Component, Input, OnChanges } from '@angular/core';
import { LeaderService } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';
import { ILeader } from '../../common/models';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.scss']
})
export class LeaderBriefComponent implements OnChanges {

  @Input() public leaderId = '';
  @Input() public viewContext = '';
  @Input() public leader: ILeader;

  // Whether it has visual like image or video or it hasn't
  public hasVisual = false;

  constructor(
    public userService: UserService,
    private leaderService: LeaderService
  ) { }

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
    this.leaderService.getLeader(id)
      .subscribe(this.applyChanges,
        err => console.error(err),
        () => { }
      );
  }
}
