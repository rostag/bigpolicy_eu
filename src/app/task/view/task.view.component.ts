import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TaskModel, TaskService } from '../../shared/task/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
// FIXME MOVE TO TASK SERVICE
import { ProjectService } from '../../shared/project/project.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task.view.component.html',
  styleUrls: ['./task.view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskViewComponent implements OnInit {

  @Input() task: TaskModel = new TaskModel();

  @Input() compactView = false;

  @Input() dataprovided = false;

  @Input() projectTitle = '';

  @Input() showProjectLink = false;

  hasVisual = false;

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    public projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private ref: ChangeDetectorRef
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  ngOnInit() {
    if (this.dataprovided) {
      // FIXME Use caching - too many requests otherwise
      // FIXME Apply the same technique to Projects retrieving Leader info
      this.retrieveProject();
    } else {
      this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('View Task by ID from route params:', id);
        if (id) {
          this.taskService.getTask(id)
          .subscribe( data => {
            this.task = data;
            this.hasVisual = Boolean(this.task.imageUrl) || Boolean(this.task.videoUrl);
            console.log('tpId =', this.task.projectId, data);
            this.retrieveProject();
          });
        }
      });
    }
  }

  retrieveProject() {
    if (this.task.projectId) {
      // FIXME MOVE TO TASK SERVICE
      this.projectService.getProject(this.task.projectId)
      .subscribe( project => {
        this.projectTitle = project.title;
        // console.log('a title:', this.projectTitle);
        this.ref.markForCheck();
      });
    }
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
