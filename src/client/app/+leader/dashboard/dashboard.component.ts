import {Component, OnInit}   from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {Leader} from '../leader/leader';
import {LeaderService} from '../leader/leader.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/+leader/dashboard/dashboard.component.html',
    styleUrls: ['app/+leader/dashboard/dashboard.component.css'],
    providers: [LeaderService]
})
export class DashboardComponent implements OnInit {
    leaders: Leader[] = [];
    constructor(
        private router: Router,
        private leaderService: LeaderService) {
    }
    ngOnInit() {
        this.leaderService.getLeaders()
            .then((leaders: Leader[]) => this.leaders = leaders.slice(1, 5));
    }
    gotoDetail(leader: Leader) {
        let link = ['LeaderDetails', { id: leader.id }];
        this.router.navigate(link);
    }
}
