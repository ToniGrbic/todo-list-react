
import React, { useContext, useReducer, useEffect, useCallback } from 'react';
import reducer from './reducer'
import { TodoAppContext, ITodo, TodoAppState, actionType, providerProps } from '../types/todos'
const uuid = require('react-uuid')

const getLocalStorage = ():ITodo[] => {
    let todos = localStorage.getItem('todos');
    if (todos) {
      return (todos = JSON.parse(localStorage.getItem('todos') as string));
    } else {
      return [];
    }
}

const defaultState:TodoAppState = {
    todos: getLocalStorage(),
    todoText: '',
    editID: null,
    editFlag: false,
    alert: { show:false, type:'', msg:''},
    select: 'All',
    filteredTodos:[],
}

const AppContext = React.createContext<TodoAppContext | null>(null)

const AppProvider:React.FC<providerProps> = ({children}) => {
 
  const [state, dispatch] = useReducer(reducer, defaultState)

  const showAlert = useCallback(
    (show:boolean = true, type:string = '', msg:string = ''):void=>{
      dispatch({type: actionType.SHOW_ALERT, payload:{show, type, msg}})
  },[])

  const deleteTodos = ():void=>{
    dispatch({type:actionType.DELETE_TODOS})
    showAlert(true, 'danger', 'todos deleted!')
  }

  const deleteTodo = (id:string):void=>{
   dispatch({type:actionType.DELETE_TODO, payload:id})
   showAlert(true, 'danger', 'todo deleted!')
  }

  const checkTodo = (id:string):void=>{
    dispatch({type:actionType.CHECK_TODO, payload:id})

    const currentTodo = state.todos.find((todo:ITodo)=>todo.id === id)
    if(currentTodo?.completed){
      showAlert(true, 'danger', 'todo uncompleted!')
    }else{
      showAlert(true, 'success', 'todo completed!')
    }
  }

  const editTodo = (id:string):void=>{
    dispatch({type:actionType.SET_EDIT_FLAG, payload:true})
    dispatch({type:actionType.SET_EDIT_ID, payload:id})
    const currentTodo = state.todos.find((todo:ITodo)=>todo.id === id)
    dispatch({type:actionType.SET_TODO_TEXT, payload:currentTodo?.text})
  } 

  const handleTodoText = (value:string):void=>{
    if(value.length < 50)
      dispatch({type:actionType.SET_TODO_TEXT, payload:value})
    else {
      showAlert(true, 'danger', 'max number of charachters reached')
    } 
  }

  const handleSelect = (value:string):void=>{
      dispatch({type:actionType.SET_SELECT, payload:value})
  }

  const moveTodo = (id:string, type:string):void=>{
    if(type === 'Up'){
      dispatch({type:actionType.MOVE_TODO, payload:{id, delta:-1}})
    }else if(type === 'Down'){
      dispatch({type:actionType.MOVE_TODO, payload:{id, delta:1}})
    }
  }

  const handleSubmit = (e:React.FormEvent):void=>{
    e.preventDefault()
    if(!state.todoText){
      showAlert( true, 'danger', 'input empty, cant sumbit!')
    }
    else if(state.todoText && state.editFlag){
      const editedTodos = state.todos.map((todo:ITodo)=>{
        if(todo.id === state.editID){
          return {...todo, text: state.todoText}
        }
        return todo
      })
      dispatch({type:actionType.SET_TODOS, payload:editedTodos})
      dispatch({type:actionType.SET_EDIT_FLAG, payload:false})
      dispatch({type:actionType.SET_TODO_TEXT, payload:''})
      showAlert(true, 'success', 'todo edited!')
    }
    else{
      const newTodo = { id: uuid(), text:state.todoText, completed:false} as ITodo
      dispatch({type:actionType.ADD_TODO, payload:newTodo})
      dispatch({type:actionType.SET_TODO_TEXT, payload:''})
      showAlert(true, 'success', 'todo added!')
    }
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos])
  
  useEffect(()=>{
    const filterTodos = ():void=>{
      let filteredTodos
      switch(state.select){
        case 'Completed':
          filteredTodos = state.todos.filter((todo:ITodo)=> todo.completed)
        break
        case 'Uncompleted':
          filteredTodos = state.todos.filter((todo:ITodo)=> !todo.completed )
        break
        default:
          filteredTodos = state.todos
        break
      }
      dispatch({type:actionType.SET_FILTERED_TODOS, payload:filteredTodos})
    }
    filterTodos()
  }, [state.select, state.todos])

    return (
      <AppContext.Provider
        value={{...state, handleSubmit, handleTodoText, handleSelect,
                 deleteTodos, deleteTodo, checkTodo, 
                showAlert, editTodo, moveTodo }}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useGlobalContext = () => {
    return useContext(AppContext);
  };
  
  export { AppContext, AppProvider };
