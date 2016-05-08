import {Component, OnInit} from '@angular/core';
// import {Router} from 'angular2/router';
import {Router} from '@angular/router-deprecated';

import {Leader} from '../leader/leader';
import {LeaderDetailsComponent} from '../details/leader-details.component';
import {LeaderService} from '../leader/leader.service';

@Component({
  selector: 'my-leaders',
  templateUrl: 'app/+leader/leaders/leaders.list.component.html',
  styleUrls: ['app/+leader/leaders/leaders.list.component.css'],
  directives: [LeaderDetailsComponent]
})

export class LeadersListComponent implements OnInit {
  leaders: Leader[];
  selectedLeader: Leader;

  constructor(
    private _leaderService: LeaderService,
    private _router: Router) {
  }

  getLeaders() {
    this._leaderService.getLeaders().then(leaders => this.leaders = leaders);
  }

  ngOnInit() {
    this.getLeaders();
  }

  onSelect(leader: Leader) { this.selectedLeader = leader; }

  gotoDetail() {
    let link = ['LeaderDetail', { id: this.selectedLeader.id }];
    this._router.navigate(link);
  }
}
