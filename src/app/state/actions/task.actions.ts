import { Action } from '@ngrx/store';

export interface TasksAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum TasksActionTypes {
    TASK_SELECT = '[Tasks] Select Task',
    TASK_LOAD = '[Tasks] Load',
    TASK_LOAD_FAIL = '[Tasks] Load Fail',
    TASK_LOAD_SUCCESS = '[Tasks] Load Success',
    TASKS_LOAD = '[Tasks] Load',
    TASKS_LOAD_FAIL = '[Tasks] Load Fail',
    TASKS_LOAD_SUCCESS = '[Tasks] Load Success',
    TASK_CREATE = '[Tasks] Create',
    TASK_CREATE_FAIL = '[Tasks] Create Fail',
    TASK_CREATE_SUCCESS = '[Tasks] Create Success'
}

// export class AddTaskToTask implements TasksAction {
//     readonly type = TasksActionTypes.TASK_ADD_TASK;
//     constructor(public payload: string) { }
// }

export class SelectTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_SELECT;
    constructor(public payload: string) { }
}
export class LoadTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_LOAD;
    constructor(public payload: string) { }
}

export class LoadTaskFail implements TasksAction {
    readonly type = TasksActionTypes.TASK_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadTaskSuccess implements TasksAction {
    readonly type = TasksActionTypes.TASK_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadTasks implements TasksAction {
    readonly type = TasksActionTypes.TASKS_LOAD;
    constructor(public payload: string) { }
}

export class LoadTasksFail implements TasksAction {
    readonly type = TasksActionTypes.TASKS_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadTasksSuccess implements TasksAction {
    readonly type = TasksActionTypes.TASKS_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class CreateTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_CREATE;
    constructor(public payload: string) { }
}

export class CreateTaskFail implements TasksAction {
    readonly type = TasksActionTypes.TASK_CREATE_FAIL;
    constructor(public payload: string) { }
}

export class CreateTaskSuccess implements TasksAction {
    readonly type = TasksActionTypes.TASK_CREATE_SUCCESS;
    constructor(public payload: any) { }
}

export type TasksActions
    = SelectTask
    | LoadTask
    | LoadTaskFail
    | LoadTaskSuccess
    | LoadTasks
    | LoadTasksFail
    | LoadTasksSuccess
    | CreateTask
    | CreateTaskFail
    | CreateTaskSuccess
    ;
