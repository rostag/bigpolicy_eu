import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { ProjectService, ProjectModel } from '../../shared/project/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { UserService } from '../../shared/user/user.service';


@Component({
  selector: 'project-list',
  moduleId: module.id,
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css'],
  directives: [MD_LIST_DIRECTIVES, ROUTER_DIRECTIVES, MdCard, MdButton, MdIcon],
  providers: [MdIconRegistry, ProjectService, UserService]
})

export class ProjectListComponent {

  projects;

  constructor(
    private http: Http,
    private projectService: ProjectService,
    private user: UserService
  ) {
    this.projects = [{title: 'Loading'}];
  }

  ngOnInit() {
    this.getProjects()
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        data => this.setProjects(data),
        err => console.error(err),
        () => this.projects
      );
  }

  private setProjects(data) {
    this.projects = data
    return data
  }

  private deleteProject(project: ProjectModel) {
    // Delete from UI Model:
    var projectToRemoveIndex = this.projects.indexOf(project)
    this.projects.splice(projectToRemoveIndex, 1)

    // Delete from DB
    this.projectService.deleteProject(project)
    return false;
  }
}
