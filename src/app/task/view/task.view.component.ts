import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { TaskModel } from '../../shared/task/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { IProject, ITask } from '../../common/models';
import { Store } from '@ngrx/store';
import { IProjectState, getSelectedProject } from '../../state/reducers/project.reducers';
import { LoadProject } from '../../state/actions/project.actions';
import { ITaskState, getSelectedTask } from '../../state/reducers/task.reducers';
import { LoadTask, DeleteTask } from '../../state/actions/task.actions';

@Component({
  selector: 'app-task-view',
  templateUrl: './task.view.component.html',
  styleUrls: ['./task.view.component.scss']
})

export class TaskViewComponent implements OnInit, OnChanges {

  @Input() public task: ITask = new TaskModel();

  @Input() public project: IProject;

  @Input() public compactView = false;

  @Input() public isUsedInline = false;

  @Input() public projectTitle = '';

  @Input() public showProjectLink = 'dontShow';

  public hasVisual = false;

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private projectStore: Store<IProjectState>,
    private taskStore: Store<ITaskState>
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    this.hasVisual = !!(this.task && (this.task.imageUrl || this.task.videoUrl));
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  public ngOnInit() {
    if (this.isUsedInline) {
      // FIXME Use caching - too many requests otherwise
      this.initProject();
    } else {
      this.route.params.subscribe(params => {
        if (params.id) {
          this.taskStore.dispatch(new LoadTask(params.id));
        }
      });
    }
    this.taskStore.select(getSelectedTask).subscribe(task => this.applyTaskChanges(task));
    this.projectStore.select(getSelectedProject).subscribe(project => this.applyProjectChanges(project));
  }

  private applyTaskChanges(task: ITask) {
    if (!task) { return };
    this.task = task;
    this.hasVisual = !!(this.task && (this.task.imageUrl || this.task.videoUrl));
    this.initProject();
  }

  // TODO Ensure it is called for Tasks lists to show the already loaded project
  private applyProjectChanges(project: IProject) {
    this.projectTitle = project ? project.title : '';
  }

  private initProject() {
    if (!this.project || !this.project._id || !this.project.managerId) {
      this.retrieveProject();
    } else {
      this.applyProjectChanges(this.project);
    }
  }

  private retrieveProject() {
    if (this.task && this.task.projectId && !this.project ) {
      // FIXME Verify this is working
      this.projectStore.dispatch(new LoadProject(this.task.projectId));
    }
  }

  /**
   * Remove this task
   * @param {task} ITask being viewed
   */
  public deleteTask(task: ITask, event) {
    this.taskStore.dispatch(new DeleteTask(task));
    this.dialogService.info('Захід видалено', 'Ми видалили цей захід');
    this.router.navigate(['/project/' + task.projectId]);

    event.stopPropagation();
    return false;
  }
}
