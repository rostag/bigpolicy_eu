import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MdCard } from '@angular2-material/card/card';
import { MdGridList } from '@angular2-material/grid-list/grid-list';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MdInput } from '@angular2-material/input/input';

import { LeaderListComponent } from './leader/list/index';
import { TaskEditComponent } from './task/edit/index';
import { TaskListComponent } from './task/list/index';

// directives: [MdCard]
// directives: [MD_LIST_DIRECTIVES,MdButton, MdIcon],
// directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon, NavbarComponent, ToolbarComponent],
// directives: [MD_GRID_LIST_DIRECTIVES, MdCard, MdButton, MdIcon, MdToolbar],
// directives: [MdToolbar, MdIcon],
// directives: [MdButton, MdIcon, LeaderListComponent],

// directives: [TaskEditComponent, TaskListComponent],
// directives: [TaskEditComponent, TaskListComponent],

// providers: [MdIconRegistry,

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
