// CoreModule.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeaderService } from './shared/leader';
import { ProjectService } from './shared/project';
import { UserService } from './shared/user';
import { TaskService } from './shared/task';
import { DriveService } from './shared/drive';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogService } from './shared/dialog/dialog.service';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './shared/uploader/uploader.component';
import { AngularFireModule } from 'angularfire2';
import { ImageComponent } from './shared/image/image.component';
import { LeaderBriefComponent } from './leader/brief/leader.brief.component';
import { ProjectBriefComponent } from './project/brief/project.brief.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: 'AIzaSyCa_yL-SOkz0-x-cdzuRJRTmbzs-5VNNp0',
  authDomain: 'testbase-eb57f.firebaseapp.com',
  databaseURL: 'https://testbase-eb57f.firebaseio.com',
  storageBucket: 'testbase-eb57f.appspot.com',
  messagingSenderId: '780191546457'
};

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    // components we want to make available
    DialogComponent,
    UploaderComponent,
    ImageComponent,
    LeaderBriefComponent,
    ProjectBriefComponent,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    // components to use in this module
    DialogComponent,
    UploaderComponent,
    ImageComponent,
    LeaderBriefComponent,
    ProjectBriefComponent
  ],
  providers: [
    // singleton services
    UserService,
    LeaderService,
    ProjectService,
    TaskService,
    DriveService,
    DialogService
  ],
  entryComponents: [
    DialogComponent
  ]
})

export class CoreModule {

}
