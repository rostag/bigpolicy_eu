import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';
import { MdCard } from '@angular2-material/card/card';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';

import {NameListService} from '../../shared/name-list/index';

@Component({
  moduleId: module.id,
  templateUrl: './leaders.list.component.html',
  styleUrls: ['./leaders.list.component.css'],
  directives: [FORM_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
  providers: [MdIconRegistry]
  })

export class LeadersListComponent {
  constructor() {}
}
