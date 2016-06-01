import { Component } from '@angular/core';
import { Route, Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS} from '@angular/http';

// BP-MOD: REMOVED
// import { AboutComponent } from './+about/index';
// import { HomeComponent } from './+home/index';
// BP-MOD: ADDED
import { LandingComponent } from './landing/index';
import { AboutComponent } from './about/index';
import { EditLeaderComponent } from './leader/edit/index';
import { NameListService, NavbarComponent, ToolbarComponent } from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
// BP-MOD: REMOVED
// @Routes([
//   new Route({path: '/', component: HomeComponent}),
//   new Route({path: '/about', component: AboutComponent})
// ])

// BP-MOD: ADDED
@Routes([
  new Route({path: '/', component: LandingComponent}),
  new Route({path: '/about', component: AboutComponent}),
  new Route({path: '/add-leader', component: EditLeaderComponent})
])

export class AppComponent {}
