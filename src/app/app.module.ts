import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ToolbarComponent} from './shared/toolbar/toolbar.component';
import {CoreModule} from './core.module';
import {EffectsModule} from '@ngrx/effects';
import {LeaderEffects} from './state/effects/leader.effects';
import {ProjectEffects} from './state/effects/project.effects';
import {TaskEffects} from './state/effects/task.effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducer as authReducer} from './state/reducers/auth.reducers';
import {reducer as leadersReducer} from './state/reducers/leader.reducers';
import {reducer as projectsReducer} from './state/reducers/project.reducers';
import {reducer as tasksReducer} from './state/reducers/task.reducers';
import {LeaderService} from './shared/leader/leader.service';
import {ProjectService} from './shared/project/project.service';
import {TaskService} from './shared/task/task.service';
import {DialogService} from './shared/dialog/dialog.service';
import {UserService} from './shared/user/user.service';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './shared/dialog/dialog.component';
import {NguCarouselModule} from '@ngu/carousel';

// FIXME Re-enable after modules refactoring
// import { CustomBrowserXhr } from './shared/xhr/xhr';
// import { XhrFactory } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    EffectsModule.forRoot([
      LeaderEffects,
      ProjectEffects,
      TaskEffects
    ]),
    StoreModule.forRoot({
      authState: authReducer,
      leadersState: leadersReducer,
      projectsState: projectsReducer,
      tasksState: tasksReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    NguCarouselModule
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    DialogComponent
  ],
  providers: [
    LeaderService,
    ProjectService,
    TaskService,
    DialogService,
    UserService,
    Title
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
