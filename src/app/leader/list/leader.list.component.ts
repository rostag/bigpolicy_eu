import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';
import { MdCard } from '@angular2-material/card/card';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { LeaderService, LeaderModel } from '../../shared/leader/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'leader-list',
  moduleId: module.id,
  templateUrl: './leader.list.component.html',
  styleUrls: ['./leader.list.component.css'],
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
  providers: [MdIconRegistry, LeaderService, UserService]
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
