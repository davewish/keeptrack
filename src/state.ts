import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({});

export default function configureStore(preLoadState: any) {
  const middlewars = [ReduxThunk];
  const middleEnhacner = applyMiddleware(...middlewars);
  const enhancer = composeWithDevTools(middleEnhacner);
  const store = createStore(reducer, preLoadState, enhancer);

  return store;
}

interface AppState {}
export const initialAppState: AppState = {};

export const store = configureStore(initialAppState);
