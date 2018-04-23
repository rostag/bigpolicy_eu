import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { TaskModel, TaskService } from '../../shared/task/index';
import { UserService } from '../../shared/user/user.service';
import { Location } from '@angular/common';
import { IProject, ITask, IProjectResponsePage } from '../../common/models';
import { Store } from '@ngrx/store';
import { IProjectState } from '../../state/reducers/project.reducers';
import { UpdateProject, LoadProjectsPage } from '../../state/actions/project.actions';

@Component({
  selector: 'app-bp-task-edit',
  templateUrl: './task.edit.component.html',
  styleUrls: ['./task.edit.component.scss']
})

export class TaskEditComponent implements OnInit {

  @Input() projectId = '';

  @Output() onCancelEdit = new EventEmitter<any>();
  @Output() onSaveEdit = new EventEmitter<any>();

  isUpdateMode = false;

  task: ITask;

  // FIXME Used for moving tasks to other projects - Extract to separate component
  public projectsToMoveTaskTo: IProject[] = null;
  currentProject: IProject = new ProjectModel();

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private location: Location,
    private projectStore: Store<IProjectState>
  ) {
    this.task = new TaskModel();
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in task/:id/edit)
   */
  ngOnInit() {
    // if project id is provided, it means we editing / adding task from inside the parent project
    console.log('Task Editor Initialization, provided Project Id:', this.projectId);

    if (this.projectId) {
      return;
    }

    this.route.params
      .map(params => {
        console.log('Route params:', params);
        return params['id'];
      })
      .subscribe((taskId) => {
        console.log('Task Editor by ID from route params:', taskId);
        if (taskId) {
          this.taskService.getTask(taskId).subscribe(data => {
            this.parseLoadedTask(data);
          });
        }
      });
  }

  /**
   * Task loading handler
   * @param {data} Loaded task data
   */
  parseLoadedTask(task) {
    console.log('Set task:', task, ', project =', task.projectId);
    this.isUpdateMode = true;
    this.task = new TaskModel();
    this.task.parseData(task);
  }

  /**
   * Remove this task
   * @param {task} Task being viewed
   */
  deleteTask(task: ITask) {
    const projectId = task.projectId;
    console.log('Delete from project:', projectId);

    // Delete from DB
    this.taskService.deleteTask(task);

    this.router.navigate(['/project/' + projectId]);
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
          data => { this.gotoTask(data); },
          err => (er) => console.error('Task update error: ', er),
          () => { }
        );
    } else {
      // Create new task
      this.task.projectId = this.projectId;
      console.log('Task Project id =', this.task.projectId);
      this.taskService.createTask(this.task)
        .subscribe(
          data => {
            this.onSaveEdit.emit(data);
          },
          err => (er) => console.error('Task creation error: ', er),
          () => { }
        );
    }
    return false;
  }

  gotoTask(task: ITask) {
    const taskId = task._id;
    if (taskId) {
      console.log('𝕱 𝕱 𝕱 Go to task by ID: ', taskId);
      if (true /* standalone edit */) {
        this.router.navigate(['/task', taskId]).then(_ => {
          // navigation is done
        });
      }
    }
  }

  cancelEditing() {
    // this is to do after editing in the standalone mode this.location.back();
    // this is to do after editing inline:
    this.onCancelEdit.emit('cancel inline task edit');
  }

  // TODO Smarter query, not just last 100 projects
  requestProjectsToSelectFrom() {
    // FIXME TO NGRX PRJ
    // this.projectStore.dispatch(new LoadProjectsPage({ id: null, page: 1, pageSize: 100, dbQuery: '{}' }));
    this.projectService.getProjectsPage({ id: null, page: 1, pageSize: 100, dbQuery: '{}' })
      .subscribe((res) => {
        this.projectsToMoveTaskTo = res['docs'];
        console.log('got projects to move task to: ', this.projectsToMoveTaskTo);
        for (const p in this.projectsToMoveTaskTo) {
          if (this.projectsToMoveTaskTo.hasOwnProperty(p)) {
            console.log('got project: ', this.projectsToMoveTaskTo[p]._id, this.projectsToMoveTaskTo[p].title);
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
  // FIXME CHECK how to reuse projects Re-assign from taskService.deleteTask method
  // FIXME Move it to Service
  moveTaskToOtherProject(event) {
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
    this.currentProject.taskIds.splice(this.currentProject.taskIds.indexOf(this.task._id), 1);
    // FIXME TO NGRX TSK
    this.projectStore.dispatch(new UpdateProject(this.currentProject));
  }
}
