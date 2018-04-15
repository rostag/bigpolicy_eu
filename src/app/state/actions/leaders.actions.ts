import { Action } from '@ngrx/store';

export interface LeadersAction extends Action {
    // type: LeadersActionTypes;
    payload?: any;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum LeadersActionTypes {
    LEADER_SELECT = '[Leaders] Select Leader',
    LEADER_LOAD = '[Leaders] Load',
    LEADER_LOAD_FAIL = '[Leaders] Load Fail',
    LEADER_LOAD_SUCCESS = '[Leaders] Load Success',
    LEADERS_LOAD = '[Leaders] Load',
    LEADERS_LOAD_FAIL = '[Leaders] Load Fail',
    LEADERS_LOAD_SUCCESS = '[Leaders] Load Success'
}

export class SelectLeader implements LeadersAction {
    readonly type = LeadersActionTypes.LEADER_SELECT;
    constructor(public payload: string) { }
}
export class LoadLeader implements LeadersAction {
    readonly type = LeadersActionTypes.LEADER_LOAD;
    constructor(public payload: string) { }
}

export class LoadLeaderFail implements LeadersAction {
    readonly type = LeadersActionTypes.LEADER_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadLeaderSuccess implements LeadersAction {
    readonly type = LeadersActionTypes.LEADER_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadLeaders implements LeadersAction {
    readonly type = LeadersActionTypes.LEADERS_LOAD;
    constructor(public payload: string) { }
}

export class LoadLeadersFail implements LeadersAction {
    readonly type = LeadersActionTypes.LEADERS_LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadLeadersSuccess implements LeadersAction {
    readonly type = LeadersActionTypes.LEADERS_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export type AuthActions
    = SelectLeader
    | LoadLeader
    | LoadLeaderFail
    | LoadLeaderSuccess
    | LoadLeaders
    | LoadLeadersFail
    | LoadLeadersSuccess;

