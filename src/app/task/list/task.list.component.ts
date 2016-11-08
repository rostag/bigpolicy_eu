import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { TaskService, TaskModel } from '../../shared/task/index';
import { ProjectModel } from '../../shared/project/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'task-list',
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.css'],
  providers: [TaskService, UserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskListComponent implements OnChanges {

  private tasks;
  @Input() project: ProjectModel;

  ngOnChanges(changes) {
    var project = changes.project.currentValue;
    if (project && project._id) {
      this.getTasks(project._id)
    }
  }

  constructor(
    private taskService: TaskService,
    private user: UserService,
    private http: Http
  ) {
    this.tasks = [{title: 'Loading'}];
  }

  getTasks(projectId) {
    console.log('get tasks for project by id', projectId);
    this.taskService.getTasks('', projectId)
      .subscribe(
        data => this.setTasks(data),
        err => console.error(err),
        () => this.tasks
      );
  }

  private setTasks(data) {
    console.log('setTasksss:', data)
    this.tasks = data.concat();
    return data;
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
