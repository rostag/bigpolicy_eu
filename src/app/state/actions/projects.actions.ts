import { Action } from '@ngrx/store';
import { IResponsePage, IProject } from '../../common/models';

export interface ProjectsAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum ProjectsActionTypes {
    // PROJECT_ADD_TASK = '[Projects] Add Task',
    PROJECT_SELECT = '[Projects] Select Project',
    PROJECT_CREATE = '[Projects] Create Project',
    PROJECT_CREATE_FAIL = '[Projects] Create Project Fail',
    PROJECT_CREATE_SUCCESS = '[Projects] Create Project Success',
    PROJECT_LOAD = '[Projects] Load Project',
    PROJECT_LOAD_FAIL = '[Projects] Load Project Fail',
    PROJECT_LOAD_SUCCESS = '[Projects] Load Project Success',
    PROJECTS_LOAD = '[Projects] Load Projects',
    PROJECTS_LOAD_FAIL = '[Projects] Load Projects Fail',
    PROJECTS_LOAD_SUCCESS = '[Projects] Load Projects Success'
}

// export class AddTaskToProject implements ProjectsAction {
//     readonly type = ProjectsActionTypes.PROJECT_ADD_TASK;
//     constructor(public payload: string) { }
// }

export class CreateProject implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_CREATE;
    constructor(public payload: string) { }
}

export class CreateProjectFail implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_CREATE_FAIL;
    constructor(public payload: string) { }
}

export class CreateProjectSuccess implements ProjectsAction {
    readonly type = ProjectsActionTypes.PROJECT_CREATE_SUCCESS;
    constructor(public payload: any) { }
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
    constructor(public payload: IProject) { }
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
