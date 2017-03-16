// CoreModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderService } from './shared/leader';
import { ProjectService } from './shared/project';
import { UserService } from './shared/user';
import { TaskService } from './shared/task';
import { DriveService } from './shared/drive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    // components we want to make available
  ],
  declarations: [
    // components to use in this module
  ],
  providers: [
    // singleton services
    UserService,
    LeaderService,
    ProjectService,
    TaskService,
    DriveService
  ]
})

export class CoreModule {

}
