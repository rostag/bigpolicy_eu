import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService, ProjectModel } from '../../shared/project/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.scss'],
  providers: [ProjectService, UserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectListComponent implements OnChanges {

  @Input() leaderId;
  @Input() maxCount: number = 100;

  private projects: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);

  private isAddingTaskMode: boolean = false;

  ngOnChanges(changes) {
    console.log("changes:", changes);
    if (changes.leaderId && changes.leaderId.currentValue ) {
      this.requestProjects(changes.leaderId.currentValue)
    } else if (changes.maxCount && changes.maxCount.currentValue) {
      this.requestProjects(null, changes.maxCount.currentValue)
    }
  }

  constructor(
    private projectService: ProjectService,
    private user: UserService,
    private http: Http
  ) {}

  // WIP
  requestProjects(leaderId: string = '', maxCount: number = 100) {
    var proxySub = this.projectService.getProjects('', leaderId, maxCount).subscribe(projects => {
      this.projects.next(projects);
      proxySub.unsubscribe();
    });
  }

  private deleteProject(project: ProjectModel) {
    // Delete from UI Model:
    // var projectToRemoveIndex = this.projects.indexOf(project)
    // this.projects.splice(projectToRemoveIndex, 1)

    // Delete from DB
    this.projectService.deleteProject(project)
    return false;
  }
}
