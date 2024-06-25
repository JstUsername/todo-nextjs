export interface ToDoTask {
  id: number;
  text: string;
  checked: boolean;
}
interface AddTaskAction {
  type: 'ADD_TASK';
  payload: ToDoTask;
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
export type ToDoSearchState = {
  taskList: ToDoTask[];
  search: string;
};
export type ToDoSearchAction = AddTaskAction | SetChangeTaskAction | RemoveTaskAction | ToggleTaskAction | SearchAction;

export interface ModalChangeTaskAction {
  type: string;
  payload: ToDoTask;
}
export type ModalChangeTaskState = {
  modalOpen: boolean;
  modalType: string;
  change: ToDoTask;
};
