import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ProjectAPI } from '../ProjectAPI';
import { Project } from '../Project';
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  ProjectState
} from './projectTypes';

export function loadProjects(
  page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: LOAD_PROJECTS_REQUEST });

    return ProjectAPI.get(page)
      .then((data) => {
        dispatch({
          type: LOAD_PROJECTS_SUCCESS,
          payload: { projects: data, page }
        });
      })
      .catch((error: any) => {
        dispatch({
          type: LOAD_PROJECTS_FAILURE,
          payload: error
        });
      });
  };
}

export function saveProject(
  project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: SAVE_PROJECT_REQUEST });
    return ProjectAPI.put(project)
      .then((data) => {
        dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: SAVE_PROJECT_REQUEST, payload: error });
      });
  };
}
