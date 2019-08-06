import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  TasksActionTypes,
  LoadTaskFail,
  LoadTaskSuccess,
  TasksAction,
  CreateTaskFail,
  CreateTaskSuccess,
  UpdateTaskFail,
  UpdateTaskSuccess,
  DeleteTaskSuccess,
  DeleteTaskFail,
  LoadTaskPageSuccess,
  LoadTaskPageFail
} from '../actions/task.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TaskService} from '../../shared/task/task.service';

@Injectable()
export class TaskEffects {

  @Effect() $createTask: Observable<TasksAction> = this.$actions.pipe(
    ofType(TasksActionTypes.TASK_CREATE),
    mergeMap((action: TasksAction) =>
      this.taskService.createTask(action.payload).pipe(
        map(data => new CreateTaskSuccess(data)),
        catchError(err => of(new CreateTaskFail(err)))
      )
    )
  );

  @Effect() $loadTask: Observable<TasksAction> = this.$actions.pipe(
    ofType(TasksActionTypes.TASK_LOAD),
    mergeMap((action: TasksAction) =>
      this.taskService.getTask(action.payload).pipe(
        map(data => new LoadTaskSuccess(data)),
        catchError(err => of(new LoadTaskFail(err)))
      )
    )
  );

  // FIXME WIP
  @Effect() $updateTask: Observable<TasksAction> = this.$actions.pipe(
    ofType(TasksActionTypes.TASK_UPDATE),
    mergeMap((action: TasksAction) =>
      this.taskService.updateTask(action.payload).pipe(
        map(data => new UpdateTaskSuccess(data)),
        catchError(err => of(new UpdateTaskFail(err)))
      )
    )
  );

  // FIXME WIP
  @Effect() $deleteTask: Observable<TasksAction> = this.$actions.pipe(
    ofType(TasksActionTypes.TASK_DELETE),
    mergeMap((action: TasksAction) =>
      this.taskService.deleteTask(action.payload).pipe(
        map(data => new DeleteTaskSuccess(data)),
        catchError(err => of(new DeleteTaskFail(err)))
      )
    )
  );

  @Effect() $loadTaskPage: Observable<TasksAction> = this.$actions.pipe(
    ofType(TasksActionTypes.LoadTasksPage),
    mergeMap((action: TasksAction) =>
      this.taskService.loadTasksPage(action.payload).pipe(
        map(data => new LoadTaskPageSuccess(data)),
        catchError(err => of(new LoadTaskPageFail(err)))
      )
    )
  );

  constructor(
    private taskService: TaskService,
    private $actions: Actions
  ) {
  }
}
