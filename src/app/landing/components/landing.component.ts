import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button/button';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LeaderListComponent } from '../../leader/list/index';
import { ProjectService, ProjectModel } from '../../shared/project/index';
import { LeaderService, LeaderModel } from '../../shared/leader/index';

@Component({
  selector: 'bp-landing',
  moduleId: module.id,
  templateUrl: './landing.component.html',
  styleUrls: ['./skeleton.css', './landing.component.css'],
  directives: [MD_GRID_LIST_DIRECTIVES, ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MdButton, MdIcon, LeaderListComponent],
  providers: [MdIconRegistry, ProjectService, LeaderService]
})

export class LandingComponent {

  constructor(
    private projectService: ProjectService,
    private leaderService: LeaderService
  ) {}

  app = {
    donors: 0,
    cash: 0,
    projects: [],
    leaders: []
  }

  ngOnInit() {
    this.getProjects()
    this.getLeaders()
  }

  getLeaders() {
    this.leaderService.getLeaders()
      .subscribe(
        data => this.setLeaders(data),
        err => console.error(err),
        () => this.app.leaders
      );
  }

  private setLeaders(data) {
    this.app.leaders = data
    return data
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        data => this.setProjects(data),
        err => console.error(err),
        () => this.app.projects
      );
  }

  private setProjects(data) {
    this.app.projects = data
    return data
  }

  supportLeader() {
    console.log('support leader');
  }
}
