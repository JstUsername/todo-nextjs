import { combineReducers } from 'redux';
import { modalChangeTaskReducer } from './modalChangeTaskReducer';
import { todoSearchReducer } from './todoSearchReducer';

export const rootReducer = combineReducers({
  todoSearch: todoSearchReducer,
  modalChange: modalChangeTaskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
