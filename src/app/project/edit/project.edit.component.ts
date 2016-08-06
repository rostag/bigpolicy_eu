import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';

import { ProjectModel, ProjectListService } from '../../shared/project-list/index';

@Component({
  moduleId: module.id,
  templateUrl: './project.edit.component.html',
  styleUrls: ['./project.edit.component.css'],
  directives: [FORM_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
  providers: [MdIconRegistry, ProjectListService]
  })

export class ProjectEditComponent {

  project: ProjectModel;

  constructor(public projectListService: ProjectListService) {
    this.project = new ProjectModel();
  }

  /*
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addProject(): boolean {
    this.projectListService.add(this.project);
    console.log(this.project.title);
    this.project = new ProjectModel();
    return false;
  }

}
