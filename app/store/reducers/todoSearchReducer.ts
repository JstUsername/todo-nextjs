import { ToDoSearchState } from '../../types/types';
import { ToDoSearchAction } from '../../types/types';

const initialStateTodoSearch: ToDoSearchState = {
  taskList: [{ id: 0, text: '', checked: false }],
  search: '',
};

export const todoSearchReducer = (state = initialStateTodoSearch, action: ToDoSearchAction): ToDoSearchState => {
  switch (action.type) {
    case 'ADD_TASK':
      state = { taskList: state.taskList.filter((val) => val.text !== ''), search: state.search };
      return { taskList: [...state.taskList, action.payload], search: state.search };
    case 'SET_CHANGE_TASK':
      return {
        taskList: state.taskList.map((val) =>
          val.id === action.payload[0].id
            ? { id: action.payload[0].id, text: action.payload[1], checked: action.payload[0].checked }
            : val,
        ),
        search: state.search,
      };
    case 'REMOVE_TASK':
      return {
        taskList: state.taskList.filter((val) => val !== action.payload),
        search: state.search,
      };
    case 'TOGGLE_TASK':
      return {
        taskList: state.taskList.map((val) =>
          val.id === action.payload.id ? { id: val.id, text: val.text, checked: !val.checked } : val,
        ),
        search: state.search,
      };
    case 'CHANGE_SEARCH':
      return { taskList: state.taskList, search: action.payload };
    default:
      return state;
  }
};
