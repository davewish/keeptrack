import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  initialProjectState,
  projectReducer
} from './projects/state/projectReducer';
import { ProjectState } from './projects/state/projectTypes';

const reducer = combineReducers({
  projectState: projectReducer
});

export default function configureStore(preLoadState: any) {
  const middlewars = [ReduxThunk];
  const middleEnhacner = applyMiddleware(...middlewars);

  const enhancer = composeWithDevTools(middleEnhacner);

  const store = createStore(reducer, preLoadState, enhancer);

  return store;
}

export interface AppState {
  projectState: ProjectState;
}
export const initialAppState: AppState = {
  projectState: initialProjectState
};

export const store = configureStore(initialAppState);
