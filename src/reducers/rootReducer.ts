import { combineReducers } from 'redux';
import authReducer from './authReducer';
import booksReducer from './booksReducer';
import catalogReducer from './catalogReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  books: booksReducer,
});

export default rootReducer;
