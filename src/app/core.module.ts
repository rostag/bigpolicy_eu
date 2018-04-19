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
// import { LandingComponent } from './landing';

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

import { CustomBrowserXhr } from './shared/xhr/xhr';
import { DisclaimerComponent } from './about/disclaimer/disclaimer.component';
import { HttpClientModule, XhrFactory } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer as authReducer } from './state/reducers/auth.reducers';
import { reducer as leadersReducer } from './state/reducers/leaders.reducers';
import { reducer as projectsReducer } from './state/reducers/project.reducers';
import { reducer as tasksReducer } from './state/reducers/tasks.reducers';
import { counterReducer } from './state/reducers/counter.reducers';
import { AuthEffects } from './state/effects/auth.effects';
import {
  MatSnackBarModule, MatDialogModule, MatIconModule, MatCardModule, MatFormFieldModule,
  MatToolbarModule, MatButtonModule, MatMenuModule, MatSelectModule, MatProgressBarModule,
  MatListModule, MatTabsModule, MatProgressSpinnerModule, MatInputModule
} from '@angular/material';
import { LandingComponent } from './landing';
import { ProjectEffects } from './state/effects/project.effects';

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
    HttpClientModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    StoreModule.forRoot({
      authState: authReducer,
      leadersState: leadersReducer,
      projectsState: projectsReducer,
      tasksState: tasksReducer
    }),
    EffectsModule.forRoot([ ProjectEffects ]),
    // EffectsModule.forRoot([AuthEffects]),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    CookieLawModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatInputModule
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
    // LandingComponent,
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
    CookieLawModule,
    HttpClientModule
  ],
  declarations: [
    // components to use in this module
    LandingComponent,
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
    // LandingComponent,
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
    HttpClientModule,
    { provide: XhrFactory, useExisting: CustomBrowserXhr }
  ],
  entryComponents: [
    DialogComponent
  ]
})

export class CoreModule {

}
