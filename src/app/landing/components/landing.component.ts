import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button/button';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LeaderListComponent } from '../../leader/list/index';
import { ProjectListService, ProjectModel } from '../../shared/project-list/index';

@Component({
  selector: 'bp-landing',
  moduleId: module.id,
  templateUrl: './landing.component.html',
  styleUrls: ['./skeleton.css', './landing.component.css'],
  directives: [MD_GRID_LIST_DIRECTIVES, ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MdButton, MdIcon, LeaderListComponent],
  providers: [MdIconRegistry, ProjectListService]
})

export class LandingComponent {

  constructor() {
    this.app.projects = ProjectListService.getInstance().projects;
  }

  app = {
    leaders: 3,
    donors: 40,
    cash: 191259,
    projects: []
  }

  supportLeader() {
    console.log('support leader');
  }

}
