import { combineReducers } from 'redux';
import authReducer from './authReducer';
import booksReducer from './booksReducer';
import catalogReducer from './catalogReducer';
import detailBookReducer from './detailBookReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  profile: profileReducer,
  books: booksReducer,
  detailBook: detailBookReducer,
});

export default rootReducer;
