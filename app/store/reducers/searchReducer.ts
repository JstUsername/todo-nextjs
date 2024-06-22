interface SearchAction {
  type: string;
  payload: string;
}

const initialState: string = '';

export const searchReducer = (state = initialState, action: SearchAction): string => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return action.payload;
    default:
      return state;
  }
};
