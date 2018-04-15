import { Component, Input, OnChanges } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.scss']
})
export class LeaderBriefComponent implements OnChanges {

  @Input() public leaderId = '';
  @Input() public viewContext = '';
  @Input() public leader: LeaderModel = new LeaderModel();

  // Whether it has visual like image or video or it hasn't
  hasVisual = false;

  constructor(
    public userService: UserService,
    private leaderService: LeaderService
  ) { }

  ngOnChanges(changes) {
    if (changes.leaderId && changes.leaderId.currentValue) {
      if (!this.leader || !this.leader._id || !this.leader.email) {
        console.log('Get Leader by ID:');
        this.requestLeader(this.leaderId);
      } else {
        this.applyChanges(this.leader);
      }
    }
  }

  private applyChanges(leader) {
    this.leader = leader;
    this.hasVisual = Boolean(this.leader.photo) || Boolean(this.leader.videoUrl);
  }

  requestLeader(id) {
    this.leaderService.getLeader(id)
      .subscribe(this.applyChanges,
        err => console.error(err),
        () => { }
      );
  }
}
