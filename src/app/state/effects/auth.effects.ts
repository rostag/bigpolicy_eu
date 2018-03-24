import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromAuth from './authReducers';
import { AuthAction, AuthActionTypes } from './auth.actions';

@Injectable()
export class AuthEffects {

    @Effect() $login: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: AuthAction) => {
            console.log('Effect: Login', action.payload);
            return ({ type: AuthActionTypes.LOGIN_SUCCESS })
        }
        ));

    @Effect() $logout: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        map((action: AuthAction) => {
            return ({ type: AuthActionTypes.LOGOUT_SUCCESS })
        }
        ));

    constructor(
        public http: HttpClient,
        public actions$: Actions
    ) { }
}