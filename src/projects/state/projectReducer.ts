import {
  ProjectActionTypes,
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  ProjectState
} from './projectTypes';
import { Project } from '../Project';

export const initialProjectState: ProjectState = {
  projects: [],
  loading: false,
  error: '',
  page: 0
};

export function projectReducer(
  state = initialProjectState,
  action: ProjectActionTypes
) {
  switch (action.type) {
    case LOAD_PROJECTS_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOAD_PROJECTS_SUCCESS:
      let projects = [];
      const { page } = action.payload;
      if (page === 1) {
        projects = action.payload.projects;
      } else {
        projects = [...state.projects, ...action.payload.projects];
      }
      return {
        ...state,
        projects,
        page,
        loading: false,
        error: ''
      };
    case LOAD_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case SAVE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case SAVE_PROJECT_SUCCESS:
      if (action.payload.isNew) {
        return {
          ...state,
          projects: { ...state.projects, ...action.payload, loading: false }
        };
      } else {
        return {
          ...state,
          loading: false,
          projects: state.projects.map((project: Project) => {
            return project.id === action.payload.id
              ? { ...project, ...action.payload }
              : project;
          })
        };
      }
    case SAVE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case DELETE_PROJECT_REQUEST:
      return { ...state };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project: Project) => project.id !== action.payload.id
        ),
        error: ''
      };
    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
