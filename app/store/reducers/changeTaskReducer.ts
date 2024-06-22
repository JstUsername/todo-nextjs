interface ChangeTaskAction {
  type: string;
  payload: object;
}

const initialState: object = {};

export const changeTaskReducer = (state = initialState, action: ChangeTaskAction): object => {
  switch (action.type) {
    case 'CHANGE_TASK':
      return action.payload;
    default:
      return state;
  }
};
