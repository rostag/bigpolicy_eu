import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';

import {LeaderListService} from '../../shared/leader-list/index';

@Component({
  moduleId: module.id,
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.css'],
  directives: [FORM_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
  providers: [MdIconRegistry, LeaderListService]
  })

export class LeaderEditComponent {

  newName: string;

  constructor(public leaderListService: LeaderListService) {}

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addLeader(): boolean {
    this.leaderListService.add(this.newName);
    this.leaderListService.create();
    this.newName = '';
    return false;
  }

}
