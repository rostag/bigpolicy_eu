import { Action } from '@ngrx/store';
import { ITaskResponsePage, ITask, IDataPageRequest } from '../../common/models';

export interface TasksAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum TasksActionTypes {

    TASK_CREATE = '[Tasks] Create',
    TASK_CREATE_FAIL = '[Tasks] Create Fail',
    TASK_CREATE_SUCCESS = '[Tasks] Create Success',

    TASK_LOAD = '[Tasks] Load',
    TASK_LOAD_FAIL = '[Tasks] Load Fail',
    TASK_LOAD_SUCCESS = '[Tasks] Load Success',

    // UPDATE
    TASK_UPDATE = '[Tasks] Update Task',
    TASK_UPDATE_FAIL = '[Tasks] Update Task Fail',
    TASK_UPDATE_SUCCESS = '[Tasks] Update Task Success',

    // DELETE
    TASK_DELETE = '[Tasks] Delete Task',
    TASK_DELETE_FAIL = '[Tasks] Delete Task Fail',
    TASK_DELETE_SUCCESS = '[Tasks] Delete Task Success',

    TASK_SELECT = '[Tasks] Select Task',

    LoadTasksPage = '[Tasks] Load Task Page',
    LoadTaskPageFail = '[Tasks] Load Task Page Fail',
    LoadTaskPageSuccess = '[Tasks] Load Task Page Success',

}

// export class AddTaskToTask implements TasksAction {
//     readonly type = TasksActionTypes.TASK_ADD_TASK;
//     constructor(public payload: string) { }
// }

export class CreateTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_CREATE;
    constructor(public payload: ITask) { }
}

export class CreateTaskFail implements TasksAction {
    readonly type = TasksActionTypes.TASK_CREATE_FAIL;
    constructor(public payload: string) { }
}

export class CreateTaskSuccess implements TasksAction {
    readonly type = TasksActionTypes.TASK_CREATE_SUCCESS;
    constructor(public payload: any) { }
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
    constructor(public payload: ITask) { }
}


export class LoadTaskPage implements TasksAction {
    readonly type = TasksActionTypes.LoadTasksPage;
    constructor(public payload: IDataPageRequest) { }
}

export class LoadTaskPageFail implements TasksAction {
    readonly type = TasksActionTypes.LoadTaskPageFail;
    constructor(public payload: string) { }
}

export class LoadTaskPageSuccess implements TasksAction {
    readonly type = TasksActionTypes.LoadTaskPageSuccess;
    constructor(public payload: ITaskResponsePage) { }
}


export class UpdateTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_UPDATE;
    constructor(public payload: ITask) { }
}

export class UpdateTaskFail implements TasksAction {
    readonly type = TasksActionTypes.TASK_UPDATE_FAIL;
    constructor(public payload: string) { }
}

export class UpdateTaskSuccess implements TasksAction {
    readonly type = TasksActionTypes.TASK_UPDATE_SUCCESS;
    constructor(public payload: ITask) { }
}


export class DeleteTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_DELETE;
    constructor(public payload: ITask) { }
}

export class DeleteTaskFail implements TasksAction {
    readonly type = TasksActionTypes.TASK_DELETE_FAIL;
    constructor(public payload: string) { }
}

export class DeleteTaskSuccess implements TasksAction {
    readonly type = TasksActionTypes.TASK_DELETE_SUCCESS;
    constructor(public payload: any) { }
}


export class SelectTask implements TasksAction {
    readonly type = TasksActionTypes.TASK_SELECT;
    constructor(public payload: string) { }
}

export class LoadTasks implements TasksAction {
    readonly type = TasksActionTypes.LoadTasksPage;
    constructor(public payload: string) { }
}

export class LoadTasksFail implements TasksAction {
    readonly type = TasksActionTypes.LoadTaskPageFail;
    constructor(public payload: string) { }
}

export class LoadTasksSuccess implements TasksAction {
    readonly type = TasksActionTypes.LoadTaskPageSuccess;
    constructor(public payload: ITaskResponsePage) { }
}

export type TasksActions
    = CreateTask
    | CreateTaskFail
    | CreateTaskSuccess
    | LoadTask
    | LoadTaskFail
    | LoadTaskSuccess
    | UpdateTask
    | UpdateTaskFail
    | UpdateTaskSuccess
    | DeleteTask
    | DeleteTaskFail
    | DeleteTaskSuccess
    | SelectTask
    | LoadTasks
    | LoadTasksFail
    | LoadTasksSuccess
    ;
