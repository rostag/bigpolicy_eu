import { Component } from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { Routes } from '@angular/router';
import { LeaderDetailsComponent } from './leader.details.component';
import { LeaderListComponent }   from './leader.list.component';
import { LeaderService }         from './leader.service';

@Component({
    selector: 'sd-leader',
    templateUrl: 'app/+leader/components/leader.component.html',
    styleUrls: ['app/+leader/components/leader.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [LeaderService]
})
@RouteConfig([
    {
        path: '',
        component: LeaderListComponent,
        name: 'LeaderRoot',
        useAsDefault: true
    },
    {
        path: '/list',
        component:
        LeaderListComponent,
        name: 'LeaderList'
    },
    {
        path: '/:id',
        component: LeaderDetailsComponent,
        name: 'LeaderDetails'
    }
])
export class LeadersComponent {
    constructor(private router: Router) { }
}
