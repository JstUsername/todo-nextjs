interface ChangeTaskAction {
  type: string;
  payload: ChangeState;
}

interface ChangeState {
  id: number;
  text: string;
  checked: boolean;
}

const initialState: ChangeState = { id: 0, text: '', checked: false };

export const changeTaskReducer = (state = initialState, action: ChangeTaskAction): ChangeState => {
  switch (action.type) {
    case 'CHANGE_TASK':
      return action.payload;
    default:
      return state;
  }
};
