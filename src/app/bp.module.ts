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

import { LeadersComponent } from './leader/landing';
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
import { DonationsListComponent } from './shared/donate/list';

import { VideoComponent } from './shared/video/video.component';
import { FilesEditComponent } from './shared/drive/files/files.edit.component';
import { FilesViewComponent } from './shared/files/view/files.view.component';
import { HomeComponent } from './home';
import { EmailValidatorDirective } from './shared/validation/email.validator';

import { CarouselComponent } from './shared/carousel/carousel/carousel.component';

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
import { environment } from '../environments/environment';
import { NguCarouselModule } from '@ngu/carousel';
import { CompanyComponent } from './companies/brief/company/company.component';
import { QuestionsFormComponent } from './shared/questions-form/questions-form.component';

export const K = environment.K;
export const firebaseConfig = K.fbs;

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CoreModule,
        BpRoutingModule,
        CookieLawModule,
        Ng2PaginationModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NguCarouselModule
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
        CarouselComponent,
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
        LocationComponent,
        CarouselComponent,
        CompanyComponent,
        QuestionsFormComponent
    ],
    providers: [
        // singleton services
        LoggedInGuard,
        ShareService,
        DonationService,
        DriveService,
        LocationService,
    ]
})

export class BpModule { }
