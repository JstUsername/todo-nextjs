interface ModalState {
  state: boolean;
  type: string;
}

interface ModalAction {
  type: string;
  payload: any[];
}

const initialState: ModalState = {
  state: false,
  type: '',
};

export const modalReducer = (state = initialState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_ADD':
      return { state: true, type: 'add' };
    case 'OPEN_CHANGE':
      return { state: true, type: 'change' };
    case 'CLOSE':
      return { state: false, type: '' };
    default:
      return state;
  }
};
