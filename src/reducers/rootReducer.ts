import { combineReducers } from 'redux';
import { catalogApi } from '../actions/catalogActions';
import authReducer from './authReducer';
import catalogReducer from './catalogReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,

  [catalogApi.reducerPath]: catalogApi.reducer,
});

export default rootReducer;
