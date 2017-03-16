import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './shared/login/logged-in.guard';

import { ProfileComponent } from '././shared/user/profile.component';

import { AboutComponent } from './about/index';
import { LandingComponent } from './landing/index';

import { LeaderEditComponent } from './leader/edit/index';
import { LeaderListComponent } from './leader/list/index';
import { LeaderViewComponent } from './leader/view/index';

import { ProjectsComponent } from './project/landing/index';
import { ProjectEditComponent } from './project/edit/index';
import { ProjectListComponent } from './project/list/index';
import { ProjectViewComponent } from './project/view/index';

import { TaskEditComponent } from './task/edit/index';
import { TaskListComponent } from './task/list/index';
import { TaskViewComponent } from './task/view/index';

//
// The order of routes is IMPORTANT.
// More specific come first.
//
export const routes: Routes = [
  { path: 'leader/:id/edit', component: LeaderEditComponent },
  { path: 'project/:id/edit', component: ProjectEditComponent },
  { path: 'task/:id/edit', component: TaskEditComponent },
  { path: 'leader/:id', component: LeaderViewComponent },
  { path: 'project/:id', component: ProjectViewComponent },
  { path: 'task/:id', component: TaskViewComponent },

  { path: 'leaders', component: LeaderListComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-leader', component: LeaderEditComponent },
  { path: 'add-project', component: ProjectEditComponent },
  { path: 'add-task', component: TaskEditComponent },

  // The guard is added as an array, multiple guards will be executed in a sequence
  // and only let the user see the page if all of them returns or resolves to true.
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },

  { path: 'about', component: AboutComponent },
  { path: '', component: LandingComponent }
];

export const routing = RouterModule.forRoot(routes);
