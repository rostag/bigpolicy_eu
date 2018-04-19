import { Action } from '@ngrx/store';
import { IResponsePage, IProject } from '../../common/models';

export interface ProjectAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum ProjectActionTypes {
    // PROJECT_ADD_TASK = '[Project] Add Task',
    PROJECT_SELECT = '[Project] Select Project',
    PROJECT_CREATE = '[Project] Create Project',
    PROJECT_CREATE_FAIL = '[Project] Create Project Fail',
    PROJECT_CREATE_SUCCESS = '[Project] Create Project Success',
    PROJECT_LOAD = '[Project] Load Project',
    PROJECT_LOAD_FAIL = '[Project] Load Project Fail',
    PROJECT_LOAD_SUCCESS = '[Project] Load Project Success',
    PROJECTS_LOAD = '[Project] Load Projects',
    PROJECTS_LOAD_FAIL = '[Project] Load Projects Fail',
    PROJECTS_LOAD_SUCCESS = '[Project] Load Projects Success'
}

// export class AddTaskToProject implements ProjectAction {
//     readonly type = ProjectActionTypes.PROJECT_ADD_TASK;
//     constructor(public payload: string) { }
// }

export class CreateProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_CREATE;
    constructor(public payload: string) { }
}

export class CreateProjectFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_CREATE_FAIL;
    constructor(public payload: string) { }
}

export class CreateProjectSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_CREATE_SUCCESS;
    constructor(public payload: any) { }
}

export class SelectProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_SELECT;
    constructor(public payload: string) { }
}

export class LoadProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_LOAD;
    constructor(public payload: string) { }
}

export class LoadProjectFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadProjectSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_LOAD_SUCCESS;
    constructor(public payload: IProject) { }
}

export class LoadProjects implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECTS_LOAD;
    constructor(public payload: string) { }
}

export class LoadProjectsFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECTS_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadProjectsSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECTS_LOAD_SUCCESS;
    constructor(public payload: IResponsePage<IProject>) { }
}

export type ProjectsActions
    = SelectProject
    | CreateProject
    | CreateProjectFail
    | CreateProjectSuccess
    | LoadProject
    | LoadProjectFail
    | LoadProjectSuccess
    | LoadProjects
    | LoadProjectsFail
    | LoadProjectsSuccess
    ;
