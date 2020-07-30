import { BehaviorSubject ,  Subscription } from 'rxjs';
import { Component, Input, OnChanges, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ProjectModel } from '../../shared/project/project.model';
import { UserService } from '../../shared/user/user.service';
import { Store } from '@ngrx/store';
import { ITaskState, getTasksPage } from '../../state/reducers/task.reducers';
import { IProject, ITaskResponsePage, IDataPageRequest } from '../../shared/models';
import { DeleteTask, LoadTaskPage } from '../../state/actions/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskListComponent implements OnChanges, OnInit, OnDestroy {

  // List title
  @Input() title = '';

  // How many tasks to show and to request from db in single turn
  @Input() pageSize = 5;

  // To find items in DB, we can use mongo query in HTML: dbQuery='{ "$where": "this.taskIds.length > 0" }'
  @Input() dbQuery = '{}';

  // An project this task list belongs to
  @Input() project: IProject = new ProjectModel();

  @Input() showProjectLink = 'dontShow';

  // Show tasks collapsed initially, but let user to expand
  compactTasksView = true;

  public tasks: BehaviorSubject<any> = new BehaviorSubject([{ title: 'Loading...' }]);
  public itemsPage = {
    docs: this.tasks,
    limit: this.pageSize,
    page: 1,
    pages: 0,
    total: 0
  };

  isAddingTaskMode = false;

  private tasksPage$: Subscription;

  constructor(
    public userService: UserService,
    private taskStore: Store<ITaskState>
  ) {
  }

  public ngOnInit() {
    this.tasksPage$ = this.taskStore.select(getTasksPage).subscribe((tp: ITaskResponsePage) => this.setTasksPage(tp));
  }

  public ngOnDestroy() {
    this.tasksPage$.unsubscribe();
  }

  public ngOnChanges(changes) {
    const project = changes.project && changes.project.currentValue;
    if (project && project._id ||
      changes.pageSize && changes.pageSize.currentValue ||
      changes.dbQuery && changes.dbQuery.currentValue) {
      this.requestTasks();
    }
  }

  private setTasksPage(responsePage: ITaskResponsePage) {
    if (!responsePage) { return; }
    this.itemsPage.docs.next(responsePage['docs']);
    this.itemsPage.limit = responsePage['limit'];
    this.itemsPage.page = responsePage['page'];
    this.itemsPage.pages = responsePage['pages'];
    this.itemsPage.total = responsePage['total'];
  }


  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestTasks();
  }

  // FIXME Consider elimination of the code duplication in paginator
  requestTasks() {
    if (!this.project || !this.project._id) { return; }
    const req: IDataPageRequest = {
      id: this.project._id,
      page: this.itemsPage.page,
      pageSize: this.pageSize,
      dbQuery: this.dbQuery
    };
    this.taskStore.dispatch(new LoadTaskPage(req));
  }

  addTask() {
    this.isAddingTaskMode = true;
    return false;
  }

  switchTasksView() {
    this.compactTasksView = !this.compactTasksView;
  }

  deleteTask(taskToRemove: any) {
    this.taskStore.dispatch(new DeleteTask(taskToRemove));
    return false;
  }

  onSaveTaskEdit() {
    this.isAddingTaskMode = false;
    // TODO: Update Task store via NGRX
  }

  onCancelTaskEdit() {
    this.isAddingTaskMode = false;
  }
}
