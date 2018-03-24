import { Action } from '@ngrx/store';

export interface AuthAction extends Action {
    type: AuthActionTypes;
    payload?: string;
}

// These constants are Action names which we will dispatch from application to update the Store state
export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGOUT = '[Auth] Logout',
    LOGOUT_SUCCESS = '[Auth] Logout Success',
    LOGIN_ATTEMPT_ADD = '[Auth] Add Login Attempt',
    LOGIN_ATTEMPT_RESET = '[Auth] Reset Login Attempts Count'
}

export class Login implements AuthAction {
    readonly type = AuthActionTypes.LOGIN
    constructor(public payload: string) { }
}

export class LoginSuccess implements AuthAction {
    readonly type = AuthActionTypes.LOGIN_SUCCESS
}

export type AuthActions
    = Login
    | LoginSuccess;

