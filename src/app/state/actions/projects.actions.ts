import { Action } from '@ngrx/store';

export interface ProjectsAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum ProjectsActionTypes {
    PROJECT_SELECT = '[Projects] Select Project',
    PROJECT_LOAD = '[Projects] Load',
    PROJECT_LOAD_FAIL = '[Projects] Load Fail',
    PROJECT_LOAD_SUCCESS = '[Projects] Load Success',
    PROJECTS_LOAD = '[Projects] Load',
    PROJECTS_LOAD_FAIL = '[Projects] Load Fail',
    PROJECTS_LOAD_SUCCESS = '[Projects] Load Success'
}

export class SelectProject implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_SELECT;
    constructor(public payload: string) { }
}
export class LoadProject implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_LOAD;
    constructor(public payload: string) { }
}

export class LoadProjectFail implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadProjectSuccess implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadProjects implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECTS_LOAD;
    constructor(public payload: string) { }
}

export class LoadProjectsFail implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECTS_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadProjectsSuccess implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECTS_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export type ProjectsActions
    = SelectProject
    | LoadProject
    | LoadProjectFail
    | LoadProjectSuccess
    | LoadProjects
    | LoadProjectsFail
    | LoadProjectsSuccess;
