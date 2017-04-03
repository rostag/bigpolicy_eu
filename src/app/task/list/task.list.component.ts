import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { TaskService, TaskModel } from '../../shared/task/index';
import { ProjectModel } from '../../shared/project/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskListComponent implements OnChanges {

  // List title
  @Input() title = '';

  // How many tasks to show and to request from db in single turn
  @Input() pageSize = 5;

  // For searching in DB
  @Input() dbQuery = '{}';

  // An project this task list belongs to
  @Input() project: ProjectModel = new ProjectModel();

  public tasks: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);
  public itemsPage = {
    docs: this.tasks,
    limit: this.pageSize,
    page: 1,
    pages: 0,
    total: 0
  };

  isAddingTaskMode = false;

  constructor(
    public userService: UserService,
    private taskService: TaskService,
    private http: Http
  ) {}

  ngOnChanges(changes) {
    const project = changes.project && changes.project.currentValue;
    if (project && project._id ||
        changes.pageSize && changes.pageSize.currentValue ||
        changes.dbQuery && changes.dbQuery.currentValue) {
      this.requestTasks();
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestTasks();
  }

  // FIXME Consider elimintation of the code duplication in paginator
  requestTasks() {
    const proxySub = this.taskService.getTasksPage(
      null,
      this.project._id,
      this.itemsPage.page,
      this.pageSize,
      this.dbQuery
    )
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

  addTask() {
    this.isAddingTaskMode = true;
    return false;
  }

  deleteTask(taskToRemove: any) {
    // Delete in UI
    let updatedTasks;
    this.tasks.subscribe ( tasks => {
      updatedTasks = tasks.filter( task => task._id !== taskToRemove._id);
    });
    this.tasks.next( updatedTasks );

    // Delete from DB
    this.taskService.deleteTask(taskToRemove);
    return false;
  }
}
