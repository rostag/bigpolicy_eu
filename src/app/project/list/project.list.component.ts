import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService, ProjectModel } from '../../shared/project/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectListComponent implements OnChanges {

  @Input() leaderId;
  @Input() maxCount = 100;

  private projects: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);

  isAddingTaskMode = false;

  ngOnChanges(changes) {
    if (changes.leaderId && changes.leaderId.currentValue ) {
      this.requestProjects(changes.leaderId.currentValue);
    } else if (changes.maxCount && changes.maxCount.currentValue) {
      this.requestProjects(null, changes.maxCount.currentValue);
    }
  }

  constructor(
    public userService: UserService,
    private projectService: ProjectService,
    private http: Http
  ) {}

  // WIP
  requestProjects(leaderId = '', maxCount = 100) {
    const proxySub = this.projectService.getProjects('', leaderId, maxCount).subscribe(projects => {
      this.projects.next(projects);
      proxySub.unsubscribe();
    });
  }

  deleteProject(projectToRemove: ProjectModel) {
    // TODO: Also delete related tasks
    // Delete in UI
    let updatedProjects;
    this.projects.subscribe ( projects => {
      updatedProjects = projects.filter( project => project._id !== projectToRemove._id);
    });
    this.projects.next( updatedProjects );
    console.log('removed index:', projectToRemove, updatedProjects);

    // Delete from DB
    this.projectService.deleteProject(projectToRemove);
    return false;
  }
}
