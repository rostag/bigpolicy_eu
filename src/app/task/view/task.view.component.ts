import { Component, OnInit } from '@angular/core';
import { TaskModel, TaskService } from '../../shared/task/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  templateUrl: './task.view.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './task.view.component.scss'],
  providers: [TaskService, UserService]
})

export class TaskViewComponent implements OnInit {

  task: TaskModel = new TaskModel();

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private user: UserService
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        // console.log('View Task by ID from route params:', id)
        if (id) {
          this.taskService.getTask(id)
          .subscribe( data => {
            this.setTask(data);
          });
        }
      });
  }

  /**
   * Task loading handler
   * @param {data} Loaded task data
   */
  setTask(data) {
    this.task = data;
  }

  /**
   * Remove this task
   * @param {task} Task being viewed
   */
  deleteTask(task: TaskModel) {
    // Delete from DB
    this.taskService.deleteTask(task);

    this.router.navigate(['/project/' + task.projectId]);

    return false;
  }
}
