import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import coordsReducer from './coords.reducer';

const middlewares = [];

const rootReducer = combineReducers({ coordsReducer });
export default createStore(rootReducer, composeWithDevTools(...middlewares));