import { Component, Input, OnChanges } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.css']
})
export class LeaderBriefComponent implements OnChanges {

  @Input() leaderId = '';

  leader: LeaderModel = new LeaderModel();

  constructor(
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
