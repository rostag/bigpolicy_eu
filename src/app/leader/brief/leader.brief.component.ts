import { Component, Input, OnChanges } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';

// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';

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
