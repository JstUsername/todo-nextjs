import { ToDoTask } from '../../types/types';
import { ToDoAction } from '../../types/types';
import { SearchAction } from '../../types/types';

const initialStateToDo: ToDoTask[] = [{ id: 0, text: '', checked: false }];
const initialStateSearch: string = '';

export const todoReducer = (state = initialStateToDo, action: ToDoAction): ToDoTask[] => {
  switch (action.type) {
    case 'ADD_TASK':
      state = state.filter((val) => val.text !== '');
      return [...state, action.payload];
    case 'SET_CHANGE_TASK':
      return state.map((val) =>
        val.id === action.payload[0].id
          ? { id: action.payload[0].id, text: action.payload[1], checked: action.payload[0].checked }
          : val,
      );
    case 'REMOVE_TASK':
      return state.filter((val) => val !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((val) =>
        val.id === action.payload.id ? { id: val.id, text: val.text, checked: !val.checked } : val,
      );
    default:
      return state;
  }
};

export const searchReducer = (state = initialStateSearch, action: SearchAction): string => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return action.payload;
    default:
      return state;
  }
};
