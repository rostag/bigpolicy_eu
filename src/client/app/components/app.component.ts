import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {NameListService} from '../shared/index';
import {HomeComponent} from '../home/index';
import {AboutComponent} from '../about/index';
import {LeadersComponent} from '../leader/index';
import {DonorsComponent} from '../donors/donors.component';
import { EditLeaderComponent } from '../leader/edit/leader.edit.component';


@Component({
    selector: 'sd-app',
    viewProviders: [NameListService],
    templateUrl: 'app/components/app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@RouteConfig([
    {
        path: '/',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent
    },
    {
        path: '/leaders/...',
        name: 'Leaders',
        component: LeadersComponent
    },
    {
        path: '/donors',
        name: 'Donors',
        component: DonorsComponent
    },
    {
        useAsDefault: true,
        path: '/add-leader',
        component: EditLeaderComponent,
        name: 'AddLeader'
    }

])
export class AppComponent {
}
