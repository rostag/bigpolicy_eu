import { Component, Input, OnChanges } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { UserService } from '../../shared/user';

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
    if (changes.leaderId && changes.leaderId.currentValue) {
      console.log('Get Leader by ID:');
      this.requestLeader(this.leaderId);
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
