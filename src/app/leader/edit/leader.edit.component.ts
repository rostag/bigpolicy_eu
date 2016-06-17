import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdButton} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list/grid-list';

import {NameListService} from '../../shared/name-list/index';

@Component({
  moduleId: module.id,
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.css'],
  directives: [FORM_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
  providers: [MdIconRegistry, NameListService]
  })

export class EditLeaderComponent {
  newName: string;
  dividerColor: boolean;
  requiredField: boolean;
  floatingLabel: boolean;
  name: string;
  items: any[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];

  constructor(public nameListService: NameListService) {}

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    console.log(this.newName);
    return false;
  }

  addABunch(n: number) {
    for (let x = 0; x < n; x++) {
      this.items.push({ value: 5 });
    }
  }
}
