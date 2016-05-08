import { Component } from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

//import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { LeaderService }     from '../leader/leader.service';
import { LeadersListComponent } from '../leaders/leaders.list.component';
// import { LeadersListComponent }   from './leader.list.component';
import { LeaderDetailsComponent } from '../details/leader-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

// import { LeaderService }         from './leader.service';
// import { LeaderDetailsComponent } from './leader.details.component';

@Component({
    selector: 'sd-leader',
    templateUrl: 'app/+leader/components/leader.component.html',
    styleUrls: ['app/+leader/components/leader.component.css'],
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
    title = 'Leaders';
}
