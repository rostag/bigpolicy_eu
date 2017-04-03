import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

  // List title
  @Input() title = '';

  // How many leaders to show and to request from db in single turn
  @Input() pageSize = 5;

  // For searching leaders in DB
  @Input() dbQuery = '{}';

  // An ID of the Leader managing the project
  @Input() leaderId;

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
    if (changes.leaderId && changes.leaderId.currentValue ||
        changes.pageSize && changes.pageSize.currentValue ||
        changes.dbQuery && changes.dbQuery.currentValue) {
      this.requestProjects();
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestProjects();
  }

  requestProjects() {
    const proxySub = this.projectService.getProjectsPage(
        null,
        this.leaderId,
        this.itemsPage.page,
        this.pageSize,
        this.dbQuery)
      .subscribe( (responsePage: ProjectModel) => {
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
    // Delete from DB
    this.projectService.deleteProject(projectToRemove, false).subscribe( dialogResult => {
      if (dialogResult === true ) {
        // Delete in UI
        let updatedProjects;
        this.projects.subscribe ( projects => {
          updatedProjects = projects.filter( project => project._id !== projectToRemove._id);
        });
        this.projects.next( updatedProjects );
      }
    });
    return false;
  }
}
