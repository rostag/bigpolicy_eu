import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AUTH_PROVIDERS } from 'angular2-jwt';

// Directives
import { NavbarComponent, ToolbarComponent } from './shared/index';

import { TaskEditComponent } from './task/edit/index';
import { TaskListComponent } from './task/list/index';
import { TaskViewComponent } from './task/view/index';

import { ProjectsComponent } from './project/landing/index';
import { ProjectEditComponent } from './project/edit/index';
import { ProjectListComponent } from './project/list/index';
import { ProjectViewComponent } from './project/view/index';

import { LeaderEditComponent } from './leader/edit/index';
import { LeaderListComponent } from './leader/list/index';
import { LeaderViewComponent } from './leader/view/index';

import { ProfileComponent } from './shared/user/profile.component';
import { LoginComponent } from './shared/login/login.component';
import { AboutComponent } from './about/index';
import { LandingComponent } from './landing/index';

import { routing } from './app.routes';

// Services
import { UserService } from './shared/user/user.service';
import { ShareService } from './shared/sharer/share.service';

import { LoggedInGuard } from './shared/login/logged-in.guard';

import { AppComponent } from './app.component';
import { SharerComponent } from './shared/sharer/sharer.component';

import { ForbiddenValidatorDirective } from './shared/validation/email';
import { VideoComponent } from './shared/video/video.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskListComponent,
    ProjectsComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProjectListComponent,
    LeaderEditComponent,
    LeaderViewComponent,
    LeaderListComponent,
    ProfileComponent,
    LoginComponent,
    AboutComponent,
    LandingComponent,
    SharerComponent,
    ForbiddenValidatorDirective,
    VideoComponent,
    AppComponent
  ],
  imports: [
    routing,
    BrowserModule,
    RouterModule,
    FormsModule,
    MaterialModule.forRoot(),
    HttpModule
  ],
  providers: [
    // MdIconRegistry,
    LoggedInGuard,
    UserService,
    ShareService,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
