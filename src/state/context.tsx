import React, { useContext, useReducer, useEffect, useCallback, ReactElement } from 'react';
import reducer from './reducer'
import { TodoAppContext, ITodo, TodoAppState, actionType, providerProps } from '../types/todos'
import { getLocalStorage, sortByDate, sortByCreated } from '../utils/utils'

const uuid = require('react-uuid')

const defaultState:TodoAppState = {
    todos: getLocalStorage(),
    todoText: '',
    dateTime:{date:'', time:''},
    editID: null,
    editFlag: false,
    alert: { show:false, type:'', msg:''},
    select: 'All',
    sort: 'Newest',
    filteredTodos:[],
}

const AppContext = React.createContext<TodoAppContext | null>(null)

const AppProvider:React.FC<providerProps>  
      =({children}):ReactElement => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const showAlert = (show:boolean = true, type:string = '', msg:string = '')=>{
      dispatch({type: actionType.SHOW_ALERT, payload:{show, type, msg}})
  }

  const deleteTodos = ()=>{
    dispatch({type:actionType.DELETE_TODOS})
    showAlert(true, 'danger', 'todos deleted!')
  }

  const deleteTodo = (id:string)=>{
   dispatch({type:actionType.DELETE_TODO, payload:id})
   showAlert(true, 'danger', 'todo deleted!')
  }

  const checkTodo = (id:string)=>{
    dispatch({type:actionType.CHECK_TODO, payload:id})

    const currentTodo = state.todos.find((todo:ITodo)=>todo.id === id)
    if(currentTodo?.completed){
      showAlert(true, 'danger', 'todo uncompleted!')
    }else{
      showAlert(true, 'success', 'todo completed!')
    }
  }

  const editTodo = (id:string)=>{
    dispatch({type:actionType.SET_EDIT_FLAG, payload:true})
    dispatch({type:actionType.SET_EDIT_ID, payload:id})
    const currentTodo = state.todos.find((todo:ITodo)=>todo.id === id)
    dispatch({type:actionType.SET_TODO_TEXT, payload:currentTodo?.text})
  } 

  const handleDateTime = (value:string)=>{
    const dateAndTime = value.split('T')
    const [date, time] = dateAndTime
    dispatch({type:actionType.SET_DATE_TIME, payload:{date, time}})
  }

  const handleTodoText = (value:string)=>{
    if(value.length < 50)
      dispatch({type:actionType.SET_TODO_TEXT, payload:value})
    else {
      showAlert(true, 'danger', 'max number of charachters reached')
    } 
  }

  const handleShowSelect = (value:string) => {
      dispatch({type:actionType.SET_SHOW_SELECT, payload:value})
  }

  const handleSortSelect = (value:string)=>{
      dispatch({type:actionType.SET_SORT_SELECT, payload:value})
  }

  const moveTodo = (id:string, type:string)=>{
    if(type === 'Up'){
      dispatch({type:actionType.MOVE_TODO, payload:{id, delta:-1}})
    }else if(type === 'Down'){
      dispatch({type:actionType.MOVE_TODO, payload:{id, delta:1}})
    }
  }

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(!state.todoText){
      showAlert( true, 'danger', 'input empty, cant sumbit!')
    }
    else if(state.todoText && state.editFlag){
      dispatch({type:actionType.EDIT_TODO})
      dispatch({type:actionType.SET_EDIT_FLAG, payload:false})
      dispatch({type:actionType.SET_TODO_TEXT, payload:''})
      showAlert(true, 'success', 'todo edited!')
    }
    else{
      const newTodo = { 
         id: uuid(), 
         createdAt: new Date().getTime(),
         text:state.todoText,
         dateTime:state.dateTime, 
         completed:false
      } as ITodo
      if(state.sort === 'Date Ascending' || state.sort === 'Date Descending')
         dispatch({type:actionType.SET_SORT_SELECT, payload:'Newest'})
      if(state.sort === 'Oldest')
        dispatch({type:actionType.ADD_TODO_END, payload:newTodo})
      else if(state.sort === 'Newest')
        dispatch({type:actionType.ADD_TODO_BEGINING, payload:newTodo})
      dispatch({type:actionType.SET_TODO_TEXT, payload:''})
      showAlert(true, 'success', 'todo added!')
    }
  }
  

   const filterTodos = useCallback(():void=>{
      let filteredTodos
      
      switch(state.select){
        case 'Completed':
          filteredTodos = state.todos.filter((todo:ITodo)=> todo.completed)
        break
        case 'Uncompleted':
          filteredTodos = state.todos.filter((todo:ITodo)=> !todo.completed)
        break
        default:
          filteredTodos = state.todos
        break
      }
      dispatch({type:actionType.SET_FILTERED_TODOS, payload:filteredTodos})
    }, [state.todos, state.select])

    const sortTodos = useCallback(():void=>{
      let sortedTodos
      const todos = [...state.todos]
      
      switch(state.sort){
        case 'Date Ascending':
          sortedTodos = todos.sort((a,b)=>sortByDate(a.dateTime,b.dateTime))
        break
        case 'Date Descending':
          sortedTodos = todos.sort((a,b)=>sortByDate(b.dateTime,a.dateTime))
        break
        case 'Newest':
          sortedTodos = todos.sort((a,b)=>sortByCreated(a.createdAt, b.createdAt))
        break
        case 'Oldest':
          sortedTodos = todos.sort((a,b)=>sortByCreated(b.createdAt, a.createdAt))
        break
      }
      dispatch({type:actionType.SET_TODOS, payload:sortedTodos})
    },[state.sort])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos])

  useEffect(()=>{
    filterTodos()
  }, [filterTodos])

  useEffect(()=>{
    sortTodos()
  }, [sortTodos])

    return (
      <AppContext.Provider
        value={{...state, handleSubmit, handleTodoText, handleShowSelect,
                 handleSortSelect, deleteTodos, deleteTodo, checkTodo, 
                 handleDateTime, showAlert, editTodo, moveTodo }}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useGlobalContext = () => {
    return useContext(AppContext);
  };
  
  export { AppContext, AppProvider };
