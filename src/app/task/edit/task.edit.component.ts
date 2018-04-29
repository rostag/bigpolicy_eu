import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { TaskModel } from '../../shared/task/index';
import { UserService } from '../../shared/user/user.service';
import { Location } from '@angular/common';
import { IProject, ITask, IProjectResponsePage } from '../../common/models';
import { Store } from '@ngrx/store';
import { IProjectState } from '../../state/reducers/project.reducers';
import { UpdateProject, LoadProjectsPage } from '../../state/actions/project.actions';
import { ITaskState, getSelectedTask } from '../../state/reducers/task.reducers';
import { CreateTask, LoadTask, DeleteTask, UpdateTask } from '../../state/actions/task.actions';
import { isArray } from 'util';

@Component({
  selector: 'app-bp-task-edit',
  templateUrl: './task.edit.component.html',
  styleUrls: ['./task.edit.component.scss']
})

export class TaskEditComponent implements OnInit {

  @Input() public projectId = '';
  @Output() public onCancelEdit = new EventEmitter<any>();
  @Output() public onSaveEdit = new EventEmitter<any>();

  // FIXME Used for moving tasks to other projects - Extract to separate component
  public projectsToMoveTaskTo: IProject[] = null;
  public isUpdateMode = false;
  public task: ITask;

  private currentProject: IProject = new ProjectModel();
  private savePending;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private location: Location,
    private projectStore: Store<IProjectState>,
    private taskStore: Store<ITaskState>
  ) {
    this.task = new TaskModel();
  }

  /**
   * Initialization Event Handler, used to parse route params like `id` in task/:id/edit)
   */
  public ngOnInit() {
    if (this.projectId) { return }

    this.route.params
      .map(params => {
        console.log('Route params:', params);
        return params['id'];
      })
      .subscribe((taskId) => {
        console.log('Task Editor by ID from route params:', taskId);
        if (taskId) {
          this.taskStore.dispatch(new LoadTask(taskId));
        }
      });
    this.taskStore.select(getSelectedTask).subscribe(task => this.parseLoadedTask(task));
  }

  /**
   * Remove this task
   * @param {task} Task being viewed
   */
  public deleteTask(task: ITask) {
    this.taskStore.dispatch(new DeleteTask(task));
    this.router.navigate(['/project/' + task.projectId]);
    return false;
  }

  /**
   * Saves new or edited task by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  public saveTask(): boolean {
    this.savePending = true;
    if (this.isUpdateMode) {
      // Update existing task
      this.taskStore.dispatch(new UpdateTask(this.task));
    } else {
      // Create new task
      this.task.projectId = this.projectId;
      console.log('Task Project id =', this.task.projectId);
      this.taskStore.dispatch(new CreateTask(this.task));
      // FIXME Complete Task processing, check the result of the below.
      this.onSaveEdit.emit(this.task);
    }
    return false;
  }

  public cancelEditing() {
    this.onCancelEdit.emit('cancel inline task edit');
    this.gotoTask(this.task);
  }

  // TODO Smarter query, not just last 100 projects
  public requestProjectsToSelectFrom() {
    // FIXME TO NGRX PRJ
    // this.projectStore.dispatch(new LoadProjectsPage({ id: null, page: 1, pageSize: 100, dbQuery: '{}' }));
    this.projectService.getProjectsPage({ id: null, page: 1, pageSize: 100, dbQuery: '{}' })
      .subscribe((res) => {
        this.projectsToMoveTaskTo = res['docs'];
        console.log('I got projects to move Task to: ', this.projectsToMoveTaskTo);
        for (const p in this.projectsToMoveTaskTo) {
          if (this.projectsToMoveTaskTo.hasOwnProperty(p)) {
            console.log('The project selected: ', this.projectsToMoveTaskTo[p]._id, this.projectsToMoveTaskTo[p].title);
            if (this.task.projectId === this.projectsToMoveTaskTo[p]._id) {
              // Memorize current project for later usage - we'll remove task from him:
              this.currentProject.parseData(this.projectsToMoveTaskTo[p]);
            }
          }
        }
      })
  }

  /**
   * Assigns Task to other Project
   */
  // FIXME CHECK how to reuse projects Re-assign from taskStore / Service deleteTask method
  public moveTaskToOtherProject(event) {
    const newProject: IProject = new ProjectModel();
    newProject.parseData(event.value);
    console.log(`> Move Task to: `, newProject.title);

    // Update task
    this.task.projectId = newProject._id;
    this.saveTask();

    // Add Task to new Project:
    if (newProject.taskIds.indexOf(this.task._id) === -1) {
      newProject.taskIds.push(this.task._id);
      // FIXME TO NGRX TSK
      this.projectStore.dispatch(new UpdateProject(newProject));
    }
    // Remove Task from current Project:
    // FIXME Error sometimes: ERROR TypeError: Cannot read property 'splice' of undefined
    isArray(this.currentProject.taskIds) && this.currentProject.taskIds.splice(this.currentProject.taskIds.indexOf(this.task._id), 1);
    this.projectStore.dispatch(new UpdateProject(this.currentProject));
  }

  /**
   * Task loading handler
   * @param {data} Loaded task data
   */
  private parseLoadedTask(task: ITask) {
    if (!task) { return };
    this.isUpdateMode = true;
    this.task = new TaskModel();
    this.task.parseData(task);
    console.log('Save Pending task:', this.savePending);

    if (this.savePending === true) {
      this.gotoTask(this.task);
    }
  }

  private gotoTask(task: ITask) {
    if (task._id) { this.router.navigate(['/task', task._id]).then(_ => { }) }
  }
}
