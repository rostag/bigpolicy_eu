import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';

import { AboutComponent } from './app/about/index';
import { LandingComponent } from './app/landing/index';
import { LeaderEditComponent } from './app/leader/edit/index';
import { LeaderListComponent } from './app/leader/list/index';
import { LeaderViewComponent } from './app/leader/view/index';

import { ProjectEditComponent } from './app/project/edit/index';
import { ProjectListComponent } from './app/project/list/index';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provideRouter([
    { index: true, component: LandingComponent },
    { path: '/about', component: AboutComponent },

    { path: '/leader/:id', component: LeaderViewComponent },
    { path: '/leader/:id/edit', component: LeaderEditComponent },
    { path: '/leaders', component: LeaderListComponent },
    { path: '/add-leader', component: LeaderEditComponent },

    { path: '/projects', component: ProjectListComponent },
    { path: '/add-project', component: ProjectEditComponent }
  ])
]);
