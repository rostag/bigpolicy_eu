
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy, OnInit, SimpleChange } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { HttpClient } from '@angular/common/http';
import { IProjectResponsePage, IProject } from '../../common/models';
import { Store } from '@ngrx/store';
import { IProjectState, getProjectsPage } from '../../state/reducers/project.reducers';
import { LoadProjectsPage } from '../../state/actions/project.actions';

@Component({
  selector: 'app-project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectListComponent implements OnInit, OnChanges {

  // List title
  @Input() title = '';

  // How many leaders to show and to request from db in single turn
  @Input() pageSize = 6;

  // To find items in DB, we can use mongo query in HTML: dbQuery='{ "$where": "this.taskIds.length > 0" }'
  @Input() dbQuery = '{}';

  // An ID of the Leader managing the project
  @Input() leaderId;

  // Whether to show the pagination (it's not needed at Home, for example)
  @Input() showPagination = true;

  // To let override view context for child briefs:
  @Input() viewContext = 'projectListPage';

  @Input() flexSettings = '33|30|30|50|100';

  flexState = {
    flex: '18%',
    lg: '23%',
    md: '31%',
    sm: '48%',
    xs: '98%'
  };

  public projects: BehaviorSubject<any> = new BehaviorSubject([{ title: 'Loading...' }]);

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
    private projectStore: Store<IProjectState>,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.projectStore.select(getProjectsPage).subscribe((pp: IProjectResponsePage) => this.setProjectPage(pp));
  }

  ngOnChanges(c) {
    if (c.leaderId && c.leaderId.currentValue ||
      c.pageSize && c.pageSize.currentValue ||
      c.dbQuery && c.dbQuery.currentValue) {
      this.requestProjects();
    }
    if (c.flexSettings && c.flexSettings.currentValue) {
      const flexSettings = c.flexSettings.currentValue.split('|');
      this.flexState = {
        ...this.flexState,
        flex: flexSettings[0],
        lg: flexSettings[1],
        md: flexSettings[2],
        sm: flexSettings[3],
        xs: flexSettings[4]
      }
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestProjects();
  }

  private requestProjects() {
    this.projectStore.dispatch(new LoadProjectsPage({
      id: this.leaderId,
      page: this.itemsPage.page,
      pageSize: this.pageSize,
      dbQuery: this.dbQuery
    }))
  }

  private setProjectPage(responsePage: IProjectResponsePage) {
    if (!responsePage) { return }
    this.itemsPage.docs.next(responsePage['docs']);
    this.itemsPage.limit = responsePage['limit'];
    this.itemsPage.page = responsePage['page'];
    this.itemsPage.pages = responsePage['pages'];
    this.itemsPage.total = responsePage['total'];
    // FIXME RESTORE UNSUBSCRIBE via onDestroy hook
    // proxySub.unsubscribe();
  }
}
