import { Action } from '@ngrx/store';
import { IResponsePage, IProject, IDataPageRequest } from '../../common/models';

export interface ProjectAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum ProjectActionTypes {
    // PROJECT_ADD_TASK = '[Project] Add Task',

    PROJECT_CREATE = '[Project] Create Project',
    PROJECT_CREATE_FAIL = '[Project] Create Project Fail',
    PROJECT_CREATE_SUCCESS = '[Project] Create Project Success',

    PROJECT_LOAD = '[Project] Load Project',
    PROJECT_LOAD_FAIL = '[Project] Load Project Fail',
    PROJECT_LOAD_SUCCESS = '[Project] Load Project Success',

    PROJECT_UPDATE = '[Projects] Update Project',
    PROJECT_UPDATE_FAIL = '[Projects] Update Project Fail',
    PROJECT_UPDATE_SUCCESS = '[Projects] Update Project Success',

    PROJECT_DELETE = '[Projects] Delete Project',
    PROJECT_DELETE_FAIL = '[Projects] Delete Project Fail',
    PROJECT_DELETE_SUCCESS = '[Projects] Delete Project Success',

    PROJECT_SELECT = '[Project] Select Project',

    PROJECTS_PAGE_LOAD = '[Projects] Load Page of Projects',
    PROJECTS_PAGE_LOAD_FAIL = '[Projects] Load Page of Projects Fail',
    PROJECTS_PAGE_LOAD_SUCCESS = '[Projects] Load Page of Projects Success'
}

// export class AddTaskToProject implements ProjectAction {
//     readonly type = ProjectActionTypes.PROJECT_ADD_TASK;
//     constructor(public payload: string) { }
// }

export class CreateProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_CREATE;
    constructor(public payload: IProject) { }
}

export class CreateProjectFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_CREATE_FAIL;
    constructor(public payload: string) { }
}

export class CreateProjectSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_CREATE_SUCCESS;
    constructor(public payload: any) { }
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

export class UpdateProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_UPDATE;
    constructor(public payload: IProject) { }
}

export class UpdateProjectFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_UPDATE_FAIL;
    constructor(public payload: string) { }
}

export class UpdateProjectSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_UPDATE_SUCCESS;
    constructor(public payload: IProject) { }
}



export class DeleteProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_DELETE;
    constructor(public payload: IProject) { }
}

export class DeleteProjectFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_DELETE_FAIL;
    constructor(public payload: string) { }
}

export class DeleteProjectSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_DELETE_SUCCESS;
    constructor(public payload: boolean) { }
}


export class SelectProject implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECT_SELECT;
    constructor(public payload: string) { }
}


export class LoadProjectsPage implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECTS_PAGE_LOAD;
    constructor(public payload: IDataPageRequest) { }
}

export class LoadProjectsPageFail implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECTS_PAGE_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadProjectsPageSuccess implements ProjectAction {
    readonly type = ProjectActionTypes.PROJECTS_PAGE_LOAD_SUCCESS;
    constructor(public payload: IResponsePage<IProject>) { }
}

export type ProjectsActions
    = CreateProject
    | CreateProjectFail
    | CreateProjectSuccess
    | LoadProject
    | LoadProjectFail
    | LoadProjectSuccess
    | UpdateProject
    | UpdateProjectFail
    | UpdateProjectSuccess
    | DeleteProject
    | DeleteProjectFail
    | DeleteProjectSuccess
    | SelectProject
    | LoadProjectsPage
    | LoadProjectsPageFail
    | LoadProjectsPageSuccess
    ;
