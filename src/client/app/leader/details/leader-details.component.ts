import {Component, Input, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {Leader} from '../leader/leader';
import {LeaderService} from '../leader/leader.service';

@Component({
  templateUrl: 'app/leader/details/leader-details.component.html',
  styleUrls: ['app/leader/details/leader-details.component.css']
})

export class LeaderDetailsComponent implements OnInit {
  @Input() leader: Leader;

  constructor(
    private _leaderService: LeaderService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._leaderService.getLeader(id)
      .then(leader => this.leader = leader);
  }

  goBack() {
    window.history.back();
  }
}
