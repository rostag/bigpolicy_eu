import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { ProjectListService, ProjectModel } from '../../shared/project-list/index';

@Component({
  moduleId: module.id,
  // selector: 'project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css'],
  directives: [MD_LIST_DIRECTIVES, MdCard, MdButton, MdIcon],
  providers: [MdIconRegistry, ProjectListService]
})

export class ProjectListComponent {

  constructor() {
    this.projects = ProjectListService.getInstance().projects;
  }

  projects: Array<ProjectModel>;

}
