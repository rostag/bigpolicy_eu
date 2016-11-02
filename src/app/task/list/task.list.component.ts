import { Component, Input } from '@angular/core';
import { TaskService, TaskModel } from '../../shared/task/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'task-list',
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.css'],
  providers: [TaskService, UserService]
})

export class TaskListComponent {

  private tasks;

  @Input()
  set projectId (id: string) {
    if (id) {
      this.getTasks(id)
    }
  }

  constructor(
    private http: Http,
    private taskService: TaskService,
    private user: UserService
  ) {
    this.tasks = [{title: 'Loading'}];
  }

  getTasks(projectId) {
    this.taskService.getTasks('', projectId)
      .subscribe(
        data => this.setTasks(data),
        err => console.error(err),
        () => this.tasks
      );
  }

  private setTasks(data) {
    this.tasks = data
    return data
  }

  private deleteTask(task: TaskModel) {
    // Delete from UI Model:
    var taskToRemoveIndex = this.tasks.indexOf(task)
    this.tasks.splice(taskToRemoveIndex, 1)

    // Delete from DB
    this.taskService.deleteTask(task)
    return false;
  }
}
