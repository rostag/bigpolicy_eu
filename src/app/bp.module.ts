// BpModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriveService } from './shared/drive';
import { Ng2PaginationModule } from 'ng2-pagination';
import { CookieLawModule } from 'angular2-cookie-law';

// Components
import { TaskEditComponent } from './task/edit';
import { TaskListComponent } from './task/list';
import { TaskViewComponent } from './task/view';

import { ProjectsComponent } from './project/landing';
import { ProjectEditComponent } from './project/edit';
import { ProjectListComponent } from './project/list';
import { ProjectViewComponent } from './project/view';

import { LeadersComponent } from './leader/landing/leaders.component';
import { LeaderEditComponent } from './leader/edit';
import { LeaderListComponent } from './leader/list';
import { LeaderViewComponent } from './leader/view';

import { ProfileComponent } from './shared/user/profile.component';
import { AdminComponent } from './shared/admin/admin.component';
import { AboutComponent } from './about';

import { UploaderComponent } from './shared/uploader/uploader.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageComponent } from './shared/image/image.component';
import { LeaderBriefComponent } from './leader/brief/leader.brief.component';
import { ProjectBriefComponent } from './project/brief/project.brief.component';

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

import { DisclaimerComponent } from './about/disclaimer/disclaimer.component';
import { BpRoutingModule } from './bp-routing.module';
import { MaterialModule } from './common/modules/material/material.module';
import { CoreModule } from './core.module';
import { LocationComponent } from './common/location/location.component';
import { LocationService } from './common/location/location.service';


// FIXME_SEC
export const firebaseConfig = {
    apiKey: 'AIzaSyCa_yL-SOkz0-x-cdzuRJRTmbzs-5VNNp0',
    authDomain: 'testbase-eb57f.firebaseapp.com',
    databaseURL: 'https://testbase-eb57f.firebaseio.com',
    storageBucket: 'testbase-eb57f.appspot.com',
    messagingSenderId: '780191546457'
};

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CoreModule,
        BpRoutingModule,
        CookieLawModule,
        Ng2PaginationModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    exports: [
        // components we want to make available
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
        SharerComponent,
        DonateComponent,
        DonationsListComponent,
        EmailValidatorDirective,
        VideoComponent,
        FilesEditComponent,
        FilesViewComponent,
        HomeComponent,
        UploaderComponent,
        ImageComponent,
        LeaderBriefComponent,
        ProjectBriefComponent,
        Ng2PaginationModule,
        CookieLawModule,
    ],
    declarations: [
        // components to use in this module
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
        SharerComponent,
        DonateComponent,
        DonationsListComponent,
        EmailValidatorDirective,
        VideoComponent,
        FilesEditComponent,
        FilesViewComponent,
        HomeComponent,
        UploaderComponent,
        ImageComponent,
        LeaderBriefComponent,
        ProjectBriefComponent,
        DisclaimerComponent,
        LocationComponent
    ],
    providers: [
        // singleton services
        LoggedInGuard,
        ShareService,
        DonationService,
        DriveService,
        LocationService
    ]
})

export class BpModule { }
