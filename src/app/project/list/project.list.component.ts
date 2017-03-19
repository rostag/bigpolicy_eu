import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService, ProjectModel } from '../../shared/project';
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
  @Input() pageSize = 5;

  public projects: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);
  public itemsPage = {
    docs: this.projects,
    limit: this.pageSize,
    page: 1,
    pages: 0,
    total: 0
  };

  isAddingTaskMode = false;

  constructor(
    public userService: UserService,
    private projectService: ProjectService,
    private http: Http
  ) {}

  ngOnChanges(changes) {
    if (changes.leaderId && changes.leaderId.currentValue ) {
      this.requestProjects();
    } else if (changes.pageSize && changes.pageSize.currentValue) {
      this.requestProjects();
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestProjects();
  }

  requestProjects() {
    const proxySub = this.projectService.getProjectsPage(null, this.leaderId, this.itemsPage.page, this.pageSize)
      .subscribe(responsePage => {
        // console.log('Next, responsePage:', responsePage);
        this.itemsPage.docs.next(responsePage['docs']);
        this.itemsPage.limit = responsePage['limit'];
        this.itemsPage.page = responsePage['page'];
        this.itemsPage.pages = responsePage['pages'];
        this.itemsPage.total = responsePage['total'];
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
