import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { ProjectListService } from '../../shared/project-list/index';

@Component({
  moduleId: module.id,
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css'],
  directives: [MD_LIST_DIRECTIVES, MdCard, MdButton, MdIcon],
  providers: [MdIconRegistry, ProjectListService]
})

export class ProjectListComponent {

  constructor(public projectListService: ProjectListService) {
    this.projects = projectListService.projects;
  }

  // TODO make typed Project
  projects: Array<any>;

}
