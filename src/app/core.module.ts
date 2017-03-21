// CoreModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderService } from './shared/leader';
import { ProjectService } from './shared/project';
import { UserService } from './shared/user';
import { TaskService } from './shared/task';
import { DriveService } from './shared/drive';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogService } from './shared/dialog/dialog.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    // components we want to make available
    DialogComponent
  ],
  declarations: [
    // components to use in this module
    DialogComponent
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
