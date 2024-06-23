interface AddTaskAction {
  type: 'ADD_TASK';
  payload: string;
}
interface SetChangeTaskAction {
  type: 'SET_CHANGE_TASK';
  payload: [{ id: number; text: string; checked: boolean }, string];
}
interface RemoveTaskAction {
  type: 'REMOVE_TASK';
  payload: { id: number; text: string; checked: boolean };
}
interface ToggleTaskAction {
  type: 'TOGGLE_TASK';
  payload: { id: number; text: string; checked: boolean };
}

type ToDoAction = AddTaskAction | SetChangeTaskAction | RemoveTaskAction | ToggleTaskAction;

interface ToDoState {
  id: number;
  text: string;
  checked: boolean;
}

const initialState: ToDoState[] = [{ id: 0, text: '', checked: false }];

export const todoReducer = (state = initialState, action: ToDoAction): ToDoState[] => {
  switch (action.type) {
    case 'ADD_TASK':
      state = state.filter((val) => val.text !== '');
      return [...state, { id: new Date().getTime(), text: action.payload, checked: false }];
    case 'SET_CHANGE_TASK':
      return state.map((val) =>
        val.id === action.payload[0].id
          ? { id: action.payload[0].id, text: action.payload[1], checked: action.payload[0].checked }
          : val,
      );
    case 'REMOVE_TASK':
      return state.filter((val) => val !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((val) => (val === action.payload ? { id: val.id, text: val.text, checked: !val.checked } : val));
    default:
      return state;
  }
};
