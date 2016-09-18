import { Component } from '@angular/core';
import { ProjectService, ProjectModel } from '../../shared/project/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../shared/user/user.service';


@Component({
  selector: 'project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css'],
  providers: [ProjectService, UserService]
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
