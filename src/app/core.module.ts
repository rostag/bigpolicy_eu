// CoreModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderService } from './shared/leader';
import { ProjectService } from './shared/project';
import { UserService } from './shared/user';
import { TaskService } from './shared/task';

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
    LeaderService,
    ProjectService,
    UserService,
    TaskService
  ]
})

export class CoreModule {

}
