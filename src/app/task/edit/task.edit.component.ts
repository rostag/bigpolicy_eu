import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectModel } from '../../shared/project/index';
import { TaskModel, TaskService } from '../../shared/task/index';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'bp-task-edit',
  templateUrl: './task.edit.component.html',
  styleUrls: ['./task.edit.component.css'],
  providers: [TaskService]
  })

export class TaskEditComponent {

  private isUpdateMode: boolean = false;

  @Input() projectId: string = '';
  @Input() project: ProjectModel;

  task: TaskModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.task = new TaskModel();
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('Task Editor by ID from route params:', id)
        if (id) {
          this.taskService.getTask(id)
          .subscribe(
            data => {
              this.setTask(data)
            },
            err => console.error(err),
            () => {}
          )
        }
      });
  }

  /**
   * Task loading handler
   * @param {data} Loaded task data
   */
  setTask(data){
    console.log('set task:', data, ', project =', this.project );
    if (data.length > 0) {
      this.isUpdateMode = true;
      // this.task.projectId = this.projectId;
    } else {
      this.task = new TaskModel();
      this.task.parseData(data);
    }
  }

  /**
   * Remove this task
   * @param {task} Task being viewed
   */
  private deleteTask(task: TaskModel) {
    // Delete from DB
    this.taskService.deleteTask(task)

    this.router.navigate(['/tasks'])
    return false;
  }

  /**
   * Saves new or edited task by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Task processing
  saveTask(): boolean {
    if (this.isUpdateMode) {
      // Update existing task
      this.taskService.updateTask(this.task)
      .subscribe(
        data => { this.gotoTask(data) },
        err => (err) => console.error('Task update error: ', err),
        () => {}
      )
    } else {
      // Create new task
      this.task.projectId = this.projectId;
      console.log('idd =', this.task.projectId);
      this.taskService.createTask(this.task)
      .subscribe(
        data => { this.gotoTask(data) },
        err => (err) => console.error('Task creation error: ', err),
        () => {}
      )
    }
    return false
  }

  gotoTask(task){
    var taskId = task._id
    if (taskId) {
      console.log('𝕱 𝕱 𝕱 Go to task by ID: ', taskId)
      this.router.navigate(['/task', taskId]).then(_ => {
        //navigation is done
      })
    }
  }
}
