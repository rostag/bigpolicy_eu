import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthAction, AuthActionTypes} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  @Effect() $login: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: AuthAction) => {
        console.log('Effect: Login', action.payload);
        return ({type: AuthActionTypes.LOGIN_SUCCESS});
      }
    ));

  @Effect() $logout: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    map((action: AuthAction) => {
        console.log('Effect: Logout', action);
        return ({type: AuthActionTypes.LOGOUT_SUCCESS});
      }
    ));

  constructor(
    public http: HttpClient,
    public actions$: Actions
  ) {
  }
}
