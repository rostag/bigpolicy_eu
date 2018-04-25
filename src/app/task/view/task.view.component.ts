import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { TaskModel, TaskService } from '../../shared/task/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
// FIXME MOVE TO TASK SERVICE
import { ProjectService } from '../../shared/project/project.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { IProject, ITask } from '../../common/models';
import { Store } from '@ngrx/store';
import { IProjectState, getSelectedProject } from '../../state/reducers/project.reducers';
import { LoadProject } from '../../state/actions/project.actions';
import { ITaskState, getSelectedTask } from '../../state/reducers/task.reducers';
import { LoadTask } from '../../state/actions/task.actions';

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
    public projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
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
      if (!this.project || !this.project._id || !this.project.managerId) {
        this.retrieveProject();
      } else {
        this.applyProjectChanges(this.project);
      }
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
    this.retrieveProject();
  }

  // TODO Ensure it is called for Tasks lists to show the already loaded project
  private applyProjectChanges(project: IProject) {
    this.projectTitle = project ? project.title : '';
  }

  private retrieveProject() {
    if (this.task && this.task.projectId) {
      this.projectStore.dispatch(new LoadProject(this.task.projectId));
    }
  }

  /**
   * Remove this task
   * @param {task} Task being viewed
   */
  public deleteTask(task: ITask, event) {
    event.stopPropagation();

    const projectId = task.projectId;

    this.dialogService.info('Захід видалено', 'Ми видалили цей захід');

    this.taskService.deleteTask(task);

    this.router.navigate(['/project/' + projectId]);

    return false;
  }
}
