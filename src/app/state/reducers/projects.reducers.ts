import { Action, createSelector, createFeatureSelector, State } from '@ngrx/store';
import { ProjectsAction, ProjectsActionTypes } from '../actions/projects.actions';
import { IProject } from '../../common/models';

// --------------------------------------------------------------------------------------------------------------------
// Store
// --------------------------------------------------------------------------------------------------------------------

// The AuthState iterface describes the structure of the auth store we create
export interface IProjectState {
  projects: IProject[];
  selectedProjectId: string;
  projectsById: IProject[];
}

// The initial state of the auth store
const initialState: IProjectState = {
  projects: [],
  selectedProjectId: null,
  projectsById: []
}

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
  state: IProjectState = initialState,
  action: ProjectsAction
): IProjectState {

  switch (action.type) {

    // case ProjectsActionTypes.PROJECT_ADD_TASK:
    // return state;

    case ProjectsActionTypes.PROJECT_SELECT:
      console.log('Reducer :: Project Select:', action.payload);
      return { ...state, selectedProjectId: action.payload }

    case ProjectsActionTypes.PROJECT_LOAD_SUCCESS:
      return state;

    case ProjectsActionTypes.PROJECTS_LOAD_SUCCESS:
      console.log('Reducer :: Load Projects Success:', action.payload);
      return { ...state, projects: { ...action.payload } }

    default:
      return state;
  }
}

// --------------------------------------------------------------------------------------------------------------------
// Selector functions are used to access the slices of the state from application
// More info on 'createFeatureSelector' and 'createSelector' can be found here:
// https://github.com/ngrx/platform/blob/master/docs/store/selectors.md
// --------------------------------------------------------------------------------------------------------------------

// This 'feature' selector selects auth store itself as a feature to be reused in other selectors
export const getProjectsState = createFeatureSelector<IProjectState>('projectsState');
export const getProjects = createSelector(getProjectsState, (state: IProjectState) => state.projects);
export const getSelectedProjectId = createSelector(getProjectsState, (state: IProjectState) => state.selectedProjectId);
export const getSelectedProject = createSelector(getProjectsState, getSelectedProjectId,
  (state: IProjectState, selectedProjectId: string) => state.projectsById[selectedProjectId]
);
