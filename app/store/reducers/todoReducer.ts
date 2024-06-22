interface ToDoAction {
  type: string;
  payload: any[];
}

const initialState: any[] = [''];

export const todoReducer = (state = initialState, action: ToDoAction): any[] => {
  switch (action.type) {
    case 'ADD_TASK':
      state = state.filter((val) => val !== '');
      return [...state, { id: new Date().getTime(), text: action.payload, checked: false }];
    case 'SET_CHANGE_TASK':
      console.log(action.payload[0]);
      return state.map((val) =>
        val.id === action.payload[0].id ? { id: action.payload[0].id, text: action.payload[1] } : val,
      );
    case 'REMOVE_TASK':
      return state.filter((val) => val !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((val) => (val === action.payload ? { id: val.id, text: val.text, checked: !val.checked } : val));
    default:
      return state;
  }
};
