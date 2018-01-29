// CoreModule.ts
import { BrowserModule, Title } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeaderService } from './shared/leader';
import { ProjectService } from './shared/project';
import { UserService } from './shared/user/user.service';
import { TaskService } from './shared/task';
import { DriveService } from './shared/drive';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogService } from './shared/dialog/dialog.service';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PaginationModule } from 'ng2-pagination';
import { CookieLawModule } from 'angular2-cookie-law';


// Components
import { NavbarComponent, ToolbarComponent } from './shared';

import { TaskEditComponent } from './task/edit';
import { TaskListComponent } from './task/list';
import { TaskViewComponent } from './task/view';

import { ProjectsComponent } from './project/landing';
import { ProjectEditComponent } from './project/edit';
import { ProjectListComponent } from './project/list';
import { ProjectViewComponent } from './project/view';

import { LeadersComponent } from './leader/landing';
import { LeaderEditComponent } from './leader/edit';
import { LeaderListComponent } from './leader/list';
import { LeaderViewComponent } from './leader/view';

import { ProfileComponent } from './shared/user/profile.component';
import { AdminComponent } from './shared/admin/admin.component';
import { AboutComponent } from './about';
import { LandingComponent } from './landing';

import { UploaderComponent } from './shared/uploader/uploader.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageComponent } from './shared/image/image.component';
import { LeaderBriefComponent } from './leader/brief/leader.brief.component';
import { ProjectBriefComponent } from './project/brief/project.brief.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorkingSpinnerComponent } from './shared/xhr/spinner.component';

import { SharerComponent } from './shared/sharer/sharer.component';
import { DonateComponent } from './shared/donate/donate.component';
import { DonationsListComponent } from './shared/donate/list/donations.list.component';

import { VideoComponent } from './shared/video/video.component';
import { FilesEditComponent } from './shared/drive/files/files.edit.component';
import { FilesViewComponent } from './shared/files/view/files.view.component';
import { HomeComponent } from './home/home.component';
import { EmailValidatorDirective } from './shared/validation/email.validator';

// Services
import { ShareService } from './shared/sharer/share.service';
import { DonationService } from './shared/donate/donation.service';
import { LoggedInGuard } from './shared/login/logged-in.guard';

import { HttpModule, BrowserXhr } from '@angular/http';
import { CustomBrowserXhr } from './shared/xhr/xhr';
import { DisclaimerComponent } from './about/disclaimer/disclaimer.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyCa_yL-SOkz0-x-cdzuRJRTmbzs-5VNNp0',
  authDomain: 'testbase-eb57f.firebaseapp.com',
  databaseURL: 'https://testbase-eb57f.firebaseio.com',
  storageBucket: 'testbase-eb57f.appspot.com',
  messagingSenderId: '780191546457'
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    CookieLawModule
  ],
  exports: [
    // components we want to make available
    BrowserModule,
    NavbarComponent,
    ToolbarComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskListComponent,
    ProjectsComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProjectListComponent,
    LeadersComponent,
    LeaderEditComponent,
    LeaderViewComponent,
    LeaderListComponent,
    ProfileComponent,
    AdminComponent,
    AboutComponent,
    LandingComponent,
    SharerComponent,
    DonateComponent,
    DonationsListComponent,
    EmailValidatorDirective,
    VideoComponent,
    FilesEditComponent,
    FilesViewComponent,
    HomeComponent,
    DialogComponent,
    UploaderComponent,
    ImageComponent,
    LeaderBriefComponent,
    ProjectBriefComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
    WorkingSpinnerComponent,
    Ng2PaginationModule,
    FormsModule,
    CookieLawModule
  ],
  declarations: [
    // components to use in this module
    NavbarComponent,
    ToolbarComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskListComponent,
    ProjectsComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProjectListComponent,
    LeadersComponent,
    LeaderEditComponent,
    LeaderViewComponent,
    LeaderListComponent,
    ProfileComponent,
    AdminComponent,
    AboutComponent,
    LandingComponent,
    SharerComponent,
    DonateComponent,
    DonationsListComponent,
    EmailValidatorDirective,
    VideoComponent,
    FilesEditComponent,
    FilesViewComponent,
    HomeComponent,
    DialogComponent,
    UploaderComponent,
    ImageComponent,
    LeaderBriefComponent,
    ProjectBriefComponent,
    WorkingSpinnerComponent,
    DisclaimerComponent
  ],
  providers: [
    // singleton services
    LoggedInGuard,
    ShareService,
    DonationService,
    UserService,
    LeaderService,
    ProjectService,
    TaskService,
    DriveService,
    DialogService,
    CustomBrowserXhr,
    Title,
    { provide: BrowserXhr, useExisting: CustomBrowserXhr }
  ],
  entryComponents: [
    DialogComponent
  ]
})

export class CoreModule {

}
