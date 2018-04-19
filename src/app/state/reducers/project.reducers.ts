import { Action, createSelector, createFeatureSelector, State } from '@ngrx/store';
import { ProjectAction, ProjectActionTypes } from '../actions/project.actions';
import { IProject, IProjectResponsePage } from '../../common/models';

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
  action: ProjectAction
): IProjectState {

  switch (action.type) {

    // case ProjectActionTypes.PROJECT_ADD_TASK:
    // return state;

    case ProjectActionTypes.PROJECT_CREATE_SUCCESS:
      console.log('Reducer :: Create Project Success ::', action.payload);
      return { ...state, projects: { ...state.projects, ...action.payload } }

    case ProjectActionTypes.PROJECT_SELECT:
      console.log('Reducer :: Project Select ::', action.payload);
      return { ...state, selectedProjectId: action.payload }

    case ProjectActionTypes.PROJECT_LOAD_SUCCESS:
      let newState = { ...state };
      const loadedProject: IProject = { ...action.payload };
      if (newState.projects && newState.projects.indexOf(loadedProject) === -1) {
        const nid = [...newState.projectsById];
        nid[newState.selectedProjectId] = { ...loadedProject };
        console.log('Reducer :: Load Project Success ::', newState);
        return {
          ...newState,
          projects: [...newState.projects, loadedProject],
          projectsById: <IProject[]>nid,
          selectedProjectId: newState.selectedProjectId
        }
      }
      return newState;

    case ProjectActionTypes.PROJECTS_LOAD_SUCCESS:
      const newProjects: IProject[] = [];
      const responseData: IProjectResponsePage = action.payload;
      responseData.docs.forEach(doc => {
        if (state.projects.indexOf(doc) === -1) {
          newProjects.push(doc)
        }
      })

      const nState = { ...state, projects: [...newProjects] };
      console.log(':: Reducer :: Load PROJECTS Success ::', nState);
      return nState;

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
