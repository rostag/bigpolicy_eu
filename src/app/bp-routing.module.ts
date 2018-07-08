import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderEditComponent } from './leader/edit';
import { LoggedInGuard } from './shared/login/logged-in.guard';
import { ProjectEditComponent } from './project/edit';
import { TaskEditComponent } from './task/edit';
import { LeaderViewComponent } from './leader/view';
import { ProjectViewComponent } from './project/view';
import { TaskViewComponent } from './task/view';
import { LeadersComponent } from './leader/landing';
import { ProjectsComponent } from './project/landing';
import { TaskListComponent } from './task/list';
import { ProfileComponent } from './shared/user/profile.component';
import { AboutComponent } from './about';
import { DisclaimerComponent } from './about/disclaimer/disclaimer.component';
import { AdminComponent } from './shared/admin/admin.component';
import { HomeComponent } from './home';

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

    { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'privacy', component: DisclaimerComponent },
    { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BpRoutingModule { }
