import { combineReducers } from 'redux';
import authReducer from './authReducer';
import booksReducer from './booksReducer';
import catalogReducer from './catalogReducer';
import chapterImages from './chapterImages';
import detailBookReducer from './detailBookReducer';
import profileReducer from './profileReducer';
import tagReducer from './tagReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  profile: profileReducer,
  books: booksReducer,
  detailBook: detailBookReducer,
  chapterImages: chapterImages,
  tags: tagReducer,
});

export default rootReducer;
