import { provideRouter } from '@angular/router';

import { LoggedInGuard } from './shared/login/logged-in.guard';

import { LoginComponent } from './shared/login/login.component';
import { ProfileComponent } from '././shared/user/profile.component';

import { AboutComponent } from './about/index';
import { LandingComponent } from './landing/index';

import { LeaderEditComponent } from './leader/edit/index';
import { LeaderListComponent } from './leader/list/index';
import { LeaderViewComponent } from './leader/view/index';

import { ProjectEditComponent } from './project/edit/index';
import { ProjectListComponent } from './project/list/index';
import { ProjectViewComponent } from './project/view/index';

export const routes = [

  { path: '', component: LandingComponent, index: true, terminal: true },

  { path: 'login', component: LoginComponent },
  // The guard is added as an array, multiple guards will be executed in a sequence
  // and only let the user see the page if all of them returns or resolves to true.
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },

  { path: 'add-leader', component: LeaderEditComponent },
  { path: 'leader/:id', component: LeaderViewComponent },
  { path: 'leaders', component: LeaderListComponent },
  { path: 'leader/:id/edit', component: LeaderEditComponent },

  { path: 'add-project', component: ProjectEditComponent },
  { path: 'project/:id', component: ProjectViewComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:id/edit', component: ProjectEditComponent },

  { path: 'about', component: AboutComponent }

];

export const APP_ROUTES_PROVIDER = provideRouter(routes);
