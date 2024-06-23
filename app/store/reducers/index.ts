import { combineReducers } from 'redux';
import { modalReducer } from './modalReducer';
import { todoReducer } from './todoReducer';
import { changeTaskReducer } from './changeTaskReducer';
import { searchReducer } from './searchReducer';

export const rootReducer = combineReducers({
  todo: todoReducer,
  modal: modalReducer,
  change: changeTaskReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
