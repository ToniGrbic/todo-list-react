import { ReactNode } from 'react'
export interface providerProps { children: ReactNode }

export enum actionType{
    SHOW_ALERT,
    DELETE_TODOS,
    DELETE_TODO,
    CHECK_TODO,
    SET_EDIT_ID,
    SET_EDIT_FLAG,
    ADD_TODO,
    SET_TODOS,
    SET_FILTERED_TODOS,
    SET_SELECT,
    SET_TODO_TEXT,
    MOVE_TODO
}

export interface TodoAppState {
    todos: ITodo[],
    todoText: string,
    editID: string | null,
    editFlag: boolean,
    alert: { show:boolean, type:string, msg:string},
    select: string,
    filteredTodos:ITodo[],
}

export interface TodoAppContext extends TodoAppState{
    deleteTodos: ()=> void,
    editTodo: (id:string) => void,
    checkTodo: (id:string)=>void,
    deleteTodo: (id:string)=>void,
    moveTodo: (id:string, type:string)=>void,
    handleTodoText: (value:string)=> void,
    handleSelect: (value:string)=> void,
    handleSubmit: (e:React.FormEvent<HTMLFormElement>)=>void,
    showAlert: (show:boolean, type:string, msg:string)=> void,
  }

export interface ITodo {
    readonly id:string,
    text:string,
    completed:boolean,
  }

export interface IAction{
    type:actionType,
    payload?:any
}

export interface ModalProps{
    description:string,
    setShowModal: (state:boolean)=>void,
    deleteTodos: ()=>void
}

export interface TodoProps{
    todo:ITodo,
    index:number
}



