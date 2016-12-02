import { Component } from '@angular/core';
import { LeaderService, LeaderModel } from '../../shared/leader/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'leader-list',
  templateUrl: './leader.list.component.html',
  styleUrls: ['./leader.list.component.scss'],
  providers: [LeaderService, UserService]
})

export class LeaderListComponent {

    private leadersUrl = '/leader-api/'

    private leaders = []

    constructor(
      private http: Http,
      private leaderService: LeaderService,
      private user: UserService
    ) {}

    ngOnInit() {
      this.getLeaders()
    }

    getLeaders() {
      this.leaderService.getLeaders()
        .subscribe(
          data => this.setLeaders(data),
          err => console.error(err),
          () => this.leaders
        );
    }

    private setLeaders(data) {
      this.leaders = data;
      return data
    }

    private deleteLeader(leader: LeaderModel) {
      // Delete from UI Model:
      var leaderToRemoveIndex = this.leaders.indexOf(leader)
      this.leaders.splice(leaderToRemoveIndex, 1)

      // Delete from DB
      this.leaderService.deleteLeader(leader)
      return false;
    }
}
