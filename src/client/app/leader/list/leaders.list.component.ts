import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {Leader} from '../leader/leader';
import {LeaderDetailsComponent} from '../details/leader-details.component';
import {LeaderService} from '../leader/leader.service';

@Component({
    selector: 'my-leaders',
    templateUrl: 'app/leader/list/leaders.list.component.html',
    styleUrls: ['app/leader/list/leaders.list.component.css'],
    directives: [LeaderDetailsComponent],
    providers: [LeaderService]
})

export class LeadersListComponent implements OnInit {
    leaders: Leader[];
    selectedLeader: Leader;

    constructor(
        private _leaderService: LeaderService,
        private _router: Router) {
    }

    getLeaders() {
        this._leaderService.getLeaders().then((leaders: Leader[]) => this.leaders = leaders);
    }

    ngOnInit() {
        this.getLeaders();
    }

    onSelect(leader: Leader) { this.selectedLeader = leader; }

    gotoDetail() {
        let link = ['LeaderDetails', { id: this.selectedLeader.id }];
        // console.log('HELLO:', link);
        this._router.navigate(link);
    }
}
