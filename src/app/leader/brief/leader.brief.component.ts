import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.css']
})
export class LeaderBriefComponent implements OnInit, OnChanges {

  @Input() leaderId = '';

  leader: LeaderModel = new LeaderModel();

  constructor(
    private leaderService: LeaderService
  ) {}

  ngOnInit() {
  }

  ngOnChanges(changes) {
    // console.log('chnages:', changes);
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
      data => {
          this.setLeader(data);
      },
      err => console.error(err),
      () => {}
    );
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data) {
    console.log('set leader: ', data);
    this.leader = data;
  }
}
