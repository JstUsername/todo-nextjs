import { ModalChangeTaskState } from '../../types/types';
import { ModalChangeTaskAction } from '../../types/types';

const initialStateModal: ModalChangeTaskState = {
  modalOpen: false,
  modalType: '',
  change: { id: -1, text: '', checked: false },
};

export const modalChangeTaskReducer = (
  state = initialStateModal,
  action: ModalChangeTaskAction,
): ModalChangeTaskState => {
  switch (action.type) {
    case 'OPEN_ADD':
      return { modalOpen: true, modalType: 'add', change: state.change };
    case 'OPEN_CHANGE':
      return { modalOpen: true, modalType: 'change', change: state.change };
    case 'CLOSE':
      return { modalOpen: false, modalType: state.modalType, change: state.change };
    case 'CHANGE_TASK':
      return { modalOpen: state.modalOpen, modalType: state.modalType, change: action.payload };
    default:
      return state;
  }
};
