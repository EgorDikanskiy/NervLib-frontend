import { combineReducers } from 'redux';
import authReducer from './authReducer';
import booksReducer from './booksReducer';
import catalogReducer from './catalogReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  profile: profileReducer,
  books: booksReducer,
});

export default rootReducer;
