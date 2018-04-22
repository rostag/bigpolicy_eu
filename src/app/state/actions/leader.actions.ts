import { Action } from '@ngrx/store';
import { ILeaderResponsePage, ILeader } from '../../common/models';

export interface LeaderAction extends Action {
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum LeaderActionTypes {
    LEADER_CREATE = '[Leaders] Create Leader',
    LEADER_CREATE_FAIL = '[Leaders] Create Leader Fail',
    LEADER_CREATE_SUCCESS = '[Leaders] Create Leader Success',

    LEADER_SELECT = '[Leaders] Select Leader',

    LEADER_LOAD = '[Leaders] Load Leader',
    LEADER_LOAD_FAIL = '[Leaders]Load Leader Fail',
    LEADER_LOAD_SUCCESS = '[Leaders] Load Leader Success',
    LEADERS_LOAD = '[Leaders] Load Leaders',
    LEADERS_LOAD_FAIL = '[Leaders] Load Leaders Fail',
    LEADERS_LOAD_SUCCESS = '[Leaders] Load Leaders Success'
}

export class SelectLeader implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_SELECT;
    constructor(public payload: string) { }
}

export class CreateLeader implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_CREATE;
    constructor(public payload: string) { }
}

export class CreateLeaderFail implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_CREATE_FAIL;
    constructor(public payload: string) { }
}

export class CreateLeaderSuccess implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_CREATE_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadLeader implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_LOAD;
    constructor(public payload: string) { }
}

export class LoadLeaderFail implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadLeaderSuccess implements LeaderAction {
    readonly type = LeaderActionTypes.LEADER_LOAD_SUCCESS;
    constructor(public payload: ILeader) { }
}

export class LoadLeaders implements LeaderAction {
    readonly type = LeaderActionTypes.LEADERS_LOAD;
    constructor(public payload: string) { }
}

export class LoadLeadersFail implements LeaderAction {
    readonly type = LeaderActionTypes.LEADERS_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadLeadersSuccess implements LeaderAction {
    readonly type = LeaderActionTypes.LEADERS_LOAD_SUCCESS;
    constructor(public payload: ILeaderResponsePage) { }
}

export type LeadersActions
    = SelectLeader
    | LoadLeader
    | LoadLeaderFail
    | LoadLeaderSuccess
    | LoadLeaders
    | LoadLeadersFail
    | LoadLeadersSuccess;

