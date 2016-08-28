import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { TaskService, TaskModel } from '../../shared/task/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { UserService } from '../../shared/user/user.service';


@Component({
  selector: 'task-list',
  moduleId: module.id,
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.css'],
  directives: [MD_LIST_DIRECTIVES, ROUTER_DIRECTIVES, MdCard, MdButton, MdIcon],
  providers: [MdIconRegistry, TaskService, UserService]
})

export class TaskListComponent {

  tasks;

  constructor(
    private http: Http,
    private taskService: TaskService,
    private user: UserService
  ) {
    this.tasks = [{title: 'Loading'}];
  }

  ngOnInit() {
    this.getTasks()
  }

  getTasks() {
    this.taskService.getTasks()
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
