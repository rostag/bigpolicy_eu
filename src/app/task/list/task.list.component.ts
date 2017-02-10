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

  @Input() project: ProjectModel;

  private tasks: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);

  private isAddingTaskMode = false;

  ngOnChanges(changes) {
    const project = changes.project.currentValue;
    if (project && project._id) {
      this.requestTasks(project._id);
    }
  }

  constructor(
    private taskService: TaskService,
    private user: UserService,
    private http: Http
  ) {}

  requestTasks(projectId) {
    const proxySub = this.taskService.getTasks('', projectId).subscribe(tasks => {
      this.tasks.next(tasks);
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
