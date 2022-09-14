import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer'
import uuid from 'react-uuid'

const AppContext = React.createContext()

const getLocalStorage = () => {
    let todos = localStorage.getItem('todos');
    if (todos) {
      return (todos = JSON.parse(localStorage.getItem('todos')));
    } else {
      return [];
    }
  }

const AppProvider = ({ children }) => {
 
  const defaultState = {
    todos: getLocalStorage(),
    todoText: '',
    editID: null,
    editFlag: false,
    alert: { show:false, type:'', msg:''},
    select: 'All',
    filteredTodos:[],
  }

  const [state, dispatch] =  useReducer(reducer, defaultState)

  const showAlert = (show = false, type = '', msg = '')=>{
    dispatch({type: 'SHOW_ALERT', payload:{show, type, msg}})
  }
  const deleteTodos = ()=>{
    dispatch({type:'DELETE_TODOS'})
    showAlert(true, 'danger', 'todos deleted!')
  }

  const deleteTodo = (id)=>{
   dispatch({type:'DELETE_TODO', payload:id})
   showAlert(true, 'danger', 'todo deleted!')
  }

  const checkTodo = (id)=>{
    dispatch({type:'CHECK_TODO', payload:id})
    const currentTodo = state.todos.find((todo)=>todo.id === id)
    if(currentTodo.completed === true){
      showAlert(true, 'danger', 'todo uncompleted!')
    }else{
      
      showAlert(true, 'success', 'todo completed!')
    }
  }

  const editTodo = (id)=>{
    dispatch({type:'SET_EDIT_FLAG', payload:true})
    dispatch({type:'SET_EDIT_ID', payload:id})
    const currentTodo = state.todos.find((todo)=>todo.id === id)
    dispatch({type:'SET_TODO_TEXT', payload:currentTodo.text})
  } 

  const handleTodoText = (value)=>{
    if(value.length < 50)
      dispatch({type:'SET_TODO_TEXT', payload:value})
    else {
      showAlert(true, 'danger', 'max number of charachters reached')
    } 
  }

  const handleSelect = (value)=>{
      dispatch({type:'SET_SELECT', payload:value})
  }

  const moveTodo = (id, type)=>{
    if(type === 'Up'){
      dispatch({type:'MOVE_TODO', payload:{id, delta:-1}})
    }else if(type === 'Down'){
      dispatch({type:'MOVE_TODO', payload:{id, delta:1}})
    }
  }

  const filterTodos = ()=>{
   
    let filteredTodos
    switch(state.select){
      case 'Completed':
        filteredTodos = state.todos.filter((todo)=> todo.completed)
      break
      case 'Uncompleted':
        filteredTodos = state.todos.filter((todo)=> !todo.completed )
      break
      default:
        filteredTodos = state.todos
      break
    }
    dispatch({type:'SET_FILTERED_TODOS', payload:filteredTodos})
  
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!state.todoText){
      showAlert( true, 'danger', 'input empty, cant sumbit!')
    }
    else if(state.todoText && state.editFlag){
      const editedTodos = state.todos.map((todo)=>{
        if(todo.id === state.editID){
          return {...todo, text: state.todoText}
        }
        return todo
      })
      dispatch({type:'SET_TODOS', payload:editedTodos})
      dispatch({type:'SET_EDIT_FLAG', payload:false})
      dispatch({type:'SET_TODO_TEXT', payload:''})
      showAlert(true, 'success', 'todo edited!')
    }
    else{
      const newTodo = { id: uuid(), text:state.todoText, completed:false}
      dispatch({type:'ADD_TODO', payload:newTodo})
      dispatch({type:'SET_TODO_TEXT', payload:''})
      showAlert(true, 'success', 'todo added!')
    }
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos])
  
  useEffect(()=>{
    filterTodos()
  }, [state.select, state.todos])

    return (
      <AppContext.Provider
        value={{...state, handleSubmit, handleTodoText,handleSelect,
                filterTodos, deleteTodos, deleteTodo, checkTodo, 
                showAlert, editTodo, moveTodo }}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useGlobalContext = () => {
    return useContext(AppContext);
  };
  
  export { AppContext, AppProvider };
