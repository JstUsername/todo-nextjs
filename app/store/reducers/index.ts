import { combineReducers } from 'redux';
import { modalReducer, changeTaskReducer } from './modalReducerChangeTask';
import { todoReducer, searchReducer } from './todoSearchReducer';

export const rootReducer = combineReducers({
  todo: todoReducer,
  modal: modalReducer,
  change: changeTaskReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
