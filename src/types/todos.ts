import { ReactNode } from "react";

export enum actions {
  SET_STATE,
  DELETE_TODOS,
  ADD_TODO_END,
  ADD_TODO_BEGINING,
  DELETE_TODO,
  CHECK_TODO,
  EDIT_TODO,
  MOVE_TODO,
}

export interface TodoAppState {
  todos: ITodo[];
  todoText: string;
  dateTime: { date: string; time: string };
  editID: string | null;
  editFlag: boolean;
  alert: { show: boolean; type: string; msg: string };
  select: string;
  sort: string;
  filteredTodos: ITodo[];
}

export interface TodoAppContext extends TodoAppState {
  deleteTodos: () => void;
  editTodo: (id: string) => void;
  checkTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  moveTodo: (id: string, type: string) => void;
  handleTodoText: (value: string) => void;
  handleDateTime: (value: string) => void;
  handleShowSelect: (value: string) => void;
  handleSortSelect: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showAlert: (show: boolean, type: string, msg: string) => void;
}

export interface ITodo {
  readonly id: string;
  readonly createdAt: number;
  text: string;
  dateTime: { date: string; time: string };
  completed: boolean;
}

export interface IAction {
  type: actions;
  payload?: any;
}

export type DateTime = {
  date: string;
  time: string;
};

export type ModalProps = {
  select: string;
  setShowModal: (state: boolean) => void;
};

export type TodoProps = {
  todo: ITodo;
  index: number;
};

export type FormSelectProps = {
  handleSelect: (value: string) => void;
  options: string[];
  type: string;
};
export type ClearBtnProps = {
  setShowModal: (value: boolean) => void;
  select: string;
};

export type providerProps = {
  children: ReactNode;
};
