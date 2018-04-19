import {
  Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges,
  SimpleChanges
} from '@angular/core';
import { TaskModel, TaskService } from '../../shared/task/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
// FIXME MOVE TO TASK SERVICE
import { ProjectService } from '../../shared/project/project.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { IProject, ITask } from '../../common/models';
import { Store } from '@ngrx/store';
import { IProjectState } from '../../state/reducers/project.reducers';
import { LoadProject } from '../../state/actions/project.actions';

@Component({
  selector: 'app-task-view',
  templateUrl: './task.view.component.html',
  styleUrls: ['./task.view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskViewComponent implements OnInit, OnChanges {

  @Input() task: ITask = new TaskModel();

  @Input() project: IProject;

  @Input() compactView = false;

  @Input() isUsedInline = false;

  @Input() projectTitle = '';

  @Input() showProjectLink = 'dontShow';

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
    private ref: ChangeDetectorRef,
    private dialogService: DialogService,
    private projectStore: Store<IProjectState>
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasVisual = !!(this.task && (this.task.imageUrl || this.task.videoUrl));
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  ngOnInit() {
    if (this.isUsedInline) {
      // FIXME Use caching - too many requests otherwise
      // FIXME Apply the same technique to Projects retrieving Leader info
      if (!this.project || !this.project._id || !this.project.managerId) {
        this.retrieveProject();
      } else {
        this.applyChanges(this.project);
      }
    } else {
      this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          console.log('View Task by ID from route params:', id);
          if (id) {
            this.taskService.getTask(id)
              .subscribe(data => {
                this.task = data;
                this.hasVisual = !!(this.task && (this.task.imageUrl || this.task.videoUrl));
                console.log('tpId =', this.task.projectId, data);
                this.retrieveProject();
              });
          }
        });
    }
  }

  private applyChanges(project: IProject) {
    this.projectTitle = project.title;
  }

  retrieveProject() {
    if (this.task.projectId) {
      // FIXME MOVE TO TASK SERVICE
      // console.warn('LOAD PROJECT Explicitly FOR TEH TASK:', );

      // this.projectStore.dispatch(new LoadProject(this.task.projectId));
      // this.projectService.getProject(this.task.projectId).subscribe(this.applyChanges);
    }
  }

  /**
   * Remove this task
   * @param {task} Task being viewed
   */
  deleteTask(task: ITask, event) {
    event.stopPropagation();

    const projectId = task.projectId;

    this.dialogService.info('Захід видалено', 'Ми видалили цей захід');

    // Delete from DB
    this.taskService.deleteTask(task);

    this.router.navigate(['/project/' + projectId]);

    return false;
  }
}
