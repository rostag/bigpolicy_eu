// Import necessary building blocks from the library
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthActionTypes, AuthAction } from '../actions/auth.actions';

// --------------------------------------------------------------------------------------------------------------------
// Store
// --------------------------------------------------------------------------------------------------------------------

export interface IUserProfile {
  given_name: string;
  family_name: string;
  name: string;
  email: string;
  nickname: string;
  created_at: string;
  updated_at: string;
  picture: string;
  leader?: any;
}

// The AuthState interface describes the structure of the auth store we create
export interface AuthState {
  loginAttemptsCount: number;
  loggedIn: boolean;
  userProfile: IUserProfile;
}

// The initial state of the auth store
const initialState = {
  loginAttemptsCount: 0,
  loggedIn: false,
  userProfile: null
};

// --------------------------------------------------------------------------------------------------------------------
// Reducer
// --------------------------------------------------------------------------------------------------------------------

/**
 * Reducer is a pure function, with input-output only and no side effects.
 * This is the only one who is allowed to update the state directly, it must return the updated state.
 * It will be called automatically in response to store.dispatch() of any action named above.
 * Important: state object MUST be immutable.
 * @param state The previous state.
 * @param action The Action to apply to the state.
 */
export function reducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {

  switch (action.type) {

    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, loggedIn: true, userProfile: action.payload };

    case AuthActionTypes.LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, userProfile: null };

    case AuthActionTypes.LOGIN_ATTEMPT_ADD:
      return { ...state, loginAttemptsCount: state.loginAttemptsCount + 1 };

    case AuthActionTypes.LOGIN_ATTEMPT_RESET:
      return { ...state, loginAttemptsCount: 0 };

    default:
      return state;
  }
}

// --------------------------------------------------------------------------------------------------------------------
// Selector functions
// These selector functions are used to access the slices of the state from application
// More info on 'createFeatureSelector' and 'createSelector' can be found here:
// https://github.com/ngrx/platform/blob/master/docs/store/selectors.md
// --------------------------------------------------------------------------------------------------------------------

// This 'feature' selector selects auth store itself as a feature to be reused in other selectors
export const getAuthState = createFeatureSelector<AuthState>('authState');

// This selector will be used to display login attempts count in the application
// To get reference to the authState, it composes two functions: feature selector getAuthState,
// and the function which returns the authState.loginAttemptsCount value
// export const getLoginAttemptsCount = createSelector( getAuthState, (state: AuthState) => state.loginAttemptsCount);

export const getLoggedIn = createSelector(getAuthState, (state: AuthState) => state.loggedIn);

export const selectUserProfile = createSelector(getAuthState, (state: AuthState) => state.userProfile);
