import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { CoreModule } from './core.module';
import { Ng2PaginationModule } from 'ng2-pagination';

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
import { AboutComponent } from './about/index';
import { LandingComponent } from './landing/index';

import { routing } from './app.routes';

// Services
import { ShareService } from './shared/sharer/share.service';
import { DonationService } from './shared/donate/donation.service';
// rest are shared via CoreModule

import { LoggedInGuard } from './shared/login/logged-in.guard';

import { AppComponent } from './app.component';
import { SharerComponent } from './shared/sharer/sharer.component';
import { DonateComponent } from './shared/donate/donate.component';
import { DonationsListComponent } from './shared/donate/list/donations.list.component';

import { EmailValidatorDirective } from './shared/validation/email.validator';
import { VideoComponent } from './shared/video/video.component';
import { FilesEditComponent } from './shared/drive/files/files.edit.component';
import { FilesViewComponent } from './shared/files/view/files.view.component';
import { HomeComponent } from './home/home.component';

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
    AboutComponent,
    LandingComponent,
    SharerComponent,
    DonateComponent,
    DonationsListComponent,
    EmailValidatorDirective,
    VideoComponent,
    AppComponent,
    FilesEditComponent,
    FilesViewComponent,
    HomeComponent
  ],
  imports: [
    routing,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    MaterialModule,
    CoreModule // will provide services
  ],
  providers: [
    LoggedInGuard,
    ShareService,
    DonationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
