import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Component, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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

  @Input() project: ProjectModel;
  private tasks: BehaviorSubject<any> = new BehaviorSubject([{title:'Loading...'}]);

  ngOnChanges(changes) {
    console.log('changes:', changes);
    var project = changes.project.currentValue;
    if (project && project._id) {
      this.requestTasks(project._id)
    }
  }

  constructor(
    private taskService: TaskService,
    private user: UserService,
    private http: Http,
    private ref: ChangeDetectorRef
  ) {}

  requestTasks(projectId) {
    var proxySub = this.taskService.getTasks('', projectId).subscribe(tasks => {
      console.log('Task List: get tasks', tasks);
      this.tasks.next(tasks);
      // just a test setTimeout( () => { this.tasks.next([{title:'Replaced'}]) }, 2000);      setTimeout( () => { this.tasks.next(tasks) }, 1910);
      proxySub.unsubscribe();
    });
  }

  private deleteTask(taskToRemove: any) {
    // Delete from App
    var updatedTasks;
    this.tasks.subscribe ( tasks => {
      updatedTasks = tasks.filter( task => task._id !== taskToRemove._id)
    });
    this.tasks.next( updatedTasks );

    // Delete from DB
    this.taskService.deleteTask(taskToRemove);

    return false;
  }
}
