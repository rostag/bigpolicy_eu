
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action } from "rxjs/scheduler/Action";
import { HttpClient } from "selenium-webdriver/http";
import { TasksActionTypes, LoadTaskFail, LoadTaskSuccess, TasksAction, CreateTaskFail, CreateTaskSuccess, UpdateTaskFail, UpdateTaskSuccess, DeleteTaskSuccess, DeleteTaskFail, LoadTaskPageSuccess, LoadTaskPageFail } from "../actions/task.actions";
import { mergeMap, map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { TaskService } from "../../shared/task";

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
    )

    @Effect() $loadTask: Observable<TasksAction> = this.$actions.pipe(
        ofType(TasksActionTypes.TASK_LOAD),
        mergeMap((action: TasksAction) =>
            this.taskService.getTask(action.payload).pipe(
                map(data => new LoadTaskSuccess(data)),
                catchError(err => of(new LoadTaskFail(err)))
            )
        )
    )

    // FIXME WIP
    @Effect() $updateTask: Observable<TasksAction> = this.$actions.pipe(
        ofType(TasksActionTypes.TASK_UPDATE),
        mergeMap((action: TasksAction) =>
            this.taskService.updateTask(action.payload).pipe(
                map(data => new UpdateTaskSuccess(data)),
                catchError(err => of(new UpdateTaskFail(err)))
            )
        )
    )

    // FIXME WIP
    @Effect() $deleteTask: Observable<TasksAction> = this.$actions.pipe(
        ofType(TasksActionTypes.TASK_DELETE),
        mergeMap((action: TasksAction) =>
            this.taskService.deleteTask(action.payload).pipe(
                map(data => new DeleteTaskSuccess(data)),
                catchError(err => of(new DeleteTaskFail(err)))
            )
        )
    )

    @Effect() $loadTasksPage: Observable<TasksAction> = this.$actions.pipe(
        ofType(TasksActionTypes.TASK_PAGE_LOAD),
        mergeMap((action: TasksAction) =>
            this.taskService.getTasksPage(action.payload).pipe(
                map(data => new LoadTaskPageSuccess(data)),
                catchError(err => of(new LoadTaskPageFail(err)))
            )
        )
    )

    constructor(
        private taskService: TaskService,
        private $actions: Actions
    ) { }
}