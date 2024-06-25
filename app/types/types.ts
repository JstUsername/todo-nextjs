export interface ToDoTask {
  id: number;
  text: string;
  checked: boolean;
}

interface AddTaskAction {
  type: 'ADD_TASK';
  payload: string;
}
interface SetChangeTaskAction {
  type: 'SET_CHANGE_TASK';
  payload: [ToDoTask, string];
}
interface RemoveTaskAction {
  type: 'REMOVE_TASK';
  payload: ToDoTask;
}
interface ToggleTaskAction {
  type: 'TOGGLE_TASK';
  payload: ToDoTask;
}

export interface SearchAction {
  type: 'CHANGE_SEARCH';
  payload: string;
}

export type ToDoAction = AddTaskAction | SetChangeTaskAction | RemoveTaskAction | ToggleTaskAction;

export interface ModalState {
  state: boolean;
  type: string;
}

export interface ChangeState {
  id: number;
  text: string;
  checked: boolean;
}

export interface ModalAction {
  type: string;
}

export interface ChangeTaskAction {
  type: string;
  payload: ChangeState;
}
