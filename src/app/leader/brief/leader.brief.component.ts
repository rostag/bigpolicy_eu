import { Component, Input, OnChanges } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.scss']
})
export class LeaderBriefComponent implements OnChanges {

  @Input() leaderId = '';
  @Input() viewContext = '';

  leader: LeaderModel = new LeaderModel();

  constructor(
    public userService: UserService,
    private leaderService: LeaderService
  ) {}

  ngOnChanges(changes) {
    if (changes.leaderId) {
      if (changes.leaderId.currentValue = 'random') {
        console.log('Get random leader');
        this.requestLeader(this.leaderId);
      }
    }
  }

  requestLeader(id) {
    this.leaderService.getLeader(id)
    .subscribe(
      (data) => {
          this.leader = data;
      },
      err => console.error(err),
      () => {}
    );
  }
}
