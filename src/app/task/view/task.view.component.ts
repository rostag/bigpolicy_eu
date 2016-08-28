import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { TaskModel, TaskService } from '../../shared/task/index';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  moduleId: module.id,
  templateUrl: './task.view.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './task.view.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_GRID_LIST_DIRECTIVES, MdCard, MdButton, MdIcon, MdToolbar],
  providers: [MdIconRegistry, TaskService, UserService]
})

export class TaskViewComponent {

  task: TaskModel = new TaskModel()

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private user: UserService
  ){}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('View Task by ID from route params:', id)
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
      })
  }

  /**
   * Task loading handler
   * @param {data} Loaded task data
   */
  setTask(data){
    this.task = data;
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
}
