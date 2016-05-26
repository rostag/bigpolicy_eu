import { Component } from '@angular/core';
import { LeaderService }     from '../leader/leader.service';
import { LeadersListComponent } from '../list/leaders.list.component';
import { LeaderDetailsComponent } from '../details/leader-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'sd-leader',
    templateUrl: 'app/leader/leader/leader.component.html',
    styleUrls: ['app/leader/leader/leader.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [LeaderService]
})

@RouteConfig([
    {
        useAsDefault: true,
        path: '',
        component: LeadersListComponent,
        name: 'LeadersList',
    },
    {
        path: '/:id',
        component: LeaderDetailsComponent,
        name: 'LeaderDetails'
    },
    {
        path: '/dashboard',
        component: DashboardComponent,
        name: 'Dashboard'
    }
])
export class LeadersComponent {
    constructor(private router: Router) { }
}
