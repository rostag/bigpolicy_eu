import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    private http: Http
  ) {}

  requestTasks(projectId) {
    var proxySub = this.taskService.getTasks('', projectId).subscribe(r => {
      console.log('Task List: get tasks');
      this.tasks.next(r);
      proxySub.unsubscribe();
    });
  }

  private deleteTask(taskToRemove: any) {
    // Delete from App and DB
    console.log( 'Tasks:', this.tasks );
    this.tasks.map(
      tsks => {
        var t = tsks.filter( task => task._id !== taskToRemove._id )
        console.log('deleet:', t)
        return t;
      }
    )
    .subscribe(
      data => {
        // this.tasks = data;
      }
    );
    console.log('Deleted?',this.tasks)
    // this.taskService.deleteTask(taskToRemove);
    return false;
  }
}
