import { ModalState } from '../../types/types';
import { ToDoTask } from '../../types/types';
import { ModalAction } from '../../types/types';
import { ChangeTaskAction } from '../../types/types';

const initialStateModal: ModalState = {
  state: false,
  type: '',
};
const initialStateChange: ToDoTask = { id: 0, text: '', checked: false };

export const modalReducer = (state = initialStateModal, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_ADD':
      return { state: true, type: 'add' };
    case 'OPEN_CHANGE':
      return { state: true, type: 'change' };
    case 'CLOSE':
      return { state: false, type: state.type };
    default:
      return state;
  }
};

export const changeTaskReducer = (state = initialStateChange, action: ChangeTaskAction): ToDoTask => {
  switch (action.type) {
    case 'CHANGE_TASK':
      return action.payload;
    default:
      return state;
  }
};
