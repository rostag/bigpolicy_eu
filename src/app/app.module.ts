import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './shared';
import { CoreModule } from './core.module';
import { MaterialModule } from './common/modules/material/material.module';
import { WorkingSpinnerComponent } from './shared/xhr/spinner.component';
import { EffectsModule } from '@ngrx/effects';
import { LeaderEffects } from './state/effects/leader.effects';
import { ProjectEffects } from './state/effects/project.effects';
import { TaskEffects } from './state/effects/task.effects';
import { StoreModule } from '@ngrx/store';
import { reducer as authReducer } from './state/reducers/auth.reducers';
import { reducer as leadersReducer } from './state/reducers/leader.reducers';
import { reducer as projectsReducer } from './state/reducers/project.reducers';
import { reducer as tasksReducer } from './state/reducers/task.reducers';
// import { counterReducer } from './state/reducers/counter.reducers';
// import { AuthEffects } from './state/effects/auth.effects';
import { LeaderService } from './shared/leader';
import { ProjectService } from './shared/project';
import { TaskService } from './shared/task';
import { DialogService } from './shared/dialog/dialog.service';
import { UserService } from './shared/user/user.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './shared/dialog/dialog.component';

// FIXME Re-enable after modules refactoring
// import { CustomBrowserXhr } from './shared/xhr/xhr';
// import { XhrFactory } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    AppRoutingModule,
    EffectsModule.forRoot([
      LeaderEffects,
      ProjectEffects,
      TaskEffects,
      // AuthEffects
    ]),
    StoreModule.forRoot({
      authState: authReducer,
      leadersState: leadersReducer,
      projectsState: projectsReducer,
      tasksState: tasksReducer
    })
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    WorkingSpinnerComponent,
    DialogComponent
  ],
  providers: [
    LeaderService,
    ProjectService,
    TaskService,
    DialogService,
    UserService,
    Title
    // FIXME Re-enable after modules refactoring
    // CustomBrowserXhr,
    // { provide: XhrFactory, useExisting: CustomBrowserXhr }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
      DialogComponent
  ]
})
export class AppModule { }
