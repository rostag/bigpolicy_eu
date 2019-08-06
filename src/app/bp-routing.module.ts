import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderEditComponent } from './leader/edit/leader.edit.component';
import { LoggedInGuard } from './shared/login/logged-in.guard';
import { ProjectEditComponent } from './project/edit/project.edit.component';
import { TaskEditComponent } from './task/edit/task.edit.component';
import { LeaderViewComponent } from './leader/view/leader.view.component';
import { ProjectViewComponent } from './project/view/project.view.component';
import { TaskViewComponent } from './task/view/task.view.component';
import { LeadersComponent } from './leader/landing/leaders.component';
import { ProjectsComponent } from './project/landing/projects.component';
import { TaskListComponent } from './task/list/task.list.component';
import { ProfileComponent } from './shared/user/profile.component';
import { AboutComponent } from './about/components/about.component';
import { DisclaimerComponent } from './about/disclaimer/disclaimer.component';
import { AdminComponent } from './shared/admin/admin.component';
import { HomeComponent } from './home/home.component';

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
