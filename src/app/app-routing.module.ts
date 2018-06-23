import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './shared/login/logged-in.guard';

import { ProfileComponent } from '././shared/user/profile.component';
import { AdminComponent } from '././shared/admin/admin.component';

import { DisclaimerComponent } from './about/disclaimer/disclaimer.component';
import { AboutComponent } from './about';
import { HomeComponent } from './home';

import { LeadersComponent } from './leader/landing';
import { LeaderEditComponent } from './leader/edit';
import { LeaderViewComponent } from './leader/view';

import { ProjectsComponent } from './project/landing';
import { ProjectEditComponent } from './project/edit';
import { ProjectViewComponent } from './project/view';

import { TaskEditComponent } from './task/edit';
import { TaskListComponent } from './task/list';
import { TaskViewComponent } from './task/view';

// The order of routes is important. More specific come first.
const routes: Routes = [
  { path: 'leader/:id/edit', component: LeaderEditComponent },
  { path: 'project/:id/edit', component: ProjectEditComponent },
  { path: 'task/:id/edit', component: TaskEditComponent },
  { path: 'leader/:id', component: LeaderViewComponent },
  { path: 'project/:id', component: ProjectViewComponent },
  { path: 'task/:id', component: TaskViewComponent },

  { path: 'leaders', component: LeadersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-leader', component: LeaderEditComponent },
  { path: 'add-project', component: ProjectEditComponent },
  { path: 'add-task', component: TaskEditComponent },

  // The guard is added as an array, multiple guards will be executed in a sequence
  // and only let the user see the page if all of them returns or resolves to true.
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'generator', loadChildren: 'app/generator/generator.module#GeneratorModule' },
  { path: 'privacy', component: DisclaimerComponent },
  { path: '', component: HomeComponent },

  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
