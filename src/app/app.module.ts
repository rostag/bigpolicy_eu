import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Material Design
import { MdCoreModule } from '@angular2-material/core';
import { MdCardModule } from '@angular2-material/card';
import { MdListModule } from '@angular2-material/list';
import { MdRadioModule } from '@angular2-material/radio';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdCheckboxModule } from '@angular2-material/checkbox/checkbox';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';

// Directives
import { NavbarComponent, ToolbarComponent } from './shared/index';

import { TaskEditComponent } from './task/edit/index';
import { TaskListComponent } from './task/list/index';
import { TaskViewComponent } from './task/view/index';

import { ProjectEditComponent } from './project/edit/index';
import { ProjectListComponent } from './project/list/index';
import { ProjectViewComponent } from './project/view/index';

import { LeaderEditComponent } from './leader/edit/index';
import { LeaderListComponent } from './leader/list/index';
import { LeaderViewComponent } from './leader/view/index';

import { ProfileComponent } from './shared/user/profile.component';
import { LoginComponent } from './shared/login/login.component';
import { AboutComponent } from './about/index';
import { LandingComponent } from './landing/index';

import { routing } from './app.routes';

// Services
import { UserService } from './shared/user/user.service';
import { ShareService } from './shared/sharer/share.service';

import { LoggedInGuard } from './shared/login/logged-in.guard';

import { AppComponent } from './app.component';
import { SharerComponent } from './shared/sharer/sharer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskListComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProjectListComponent,
    LeaderEditComponent,
    LeaderViewComponent,
    LeaderListComponent,
    ProfileComponent,
    LoginComponent,
    AboutComponent,
    LandingComponent,
    AppComponent,
    SharerComponent
  ],
  imports: [
    routing,
    BrowserModule,
    // Router
    RouterModule,
    // Forms
    FormsModule,
    HttpModule,
    // Material Design
    MdCoreModule.forRoot(),
    MdCardModule.forRoot(),
    MdListModule.forRoot(),
    MdRadioModule.forRoot(),
    MdInputModule.forRoot(),
    MdButtonModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdGridListModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdIconModule.forRoot(),
    // MdIconRegistry.forRoot(),
  ],
  providers: [
    MdIconRegistry,
    LoggedInGuard,
    UserService,
    ShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
