import React, { useState, useContext } from 'react';
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
  const [todos, setTodos] = useState(getLocalStorage())
  const [todoText, setTodoText] = useState('')
  const [editID, setEditID] = useState(null)
  const [editFlag, setEditFlag] = useState(false)
  const [alert, setAlert] = useState({ show:false, type:'', msg:''})
  const [select, setSelect] = useState('All')
  const [filteredTodos, setFilteredTodos] = useState([])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!todoText){
      showAlert( true, 'danger', 'input empty, cant sumbit!')
    }
    else if(todoText && editFlag){
      const editedTodos = todos.map((todo)=>{
        if(todo.id === editID){
          return {...todo, text: todoText}
        }
        return todo
      })
      setTodos(editedTodos)
      setEditFlag(false)
      setTodoText('')
      showAlert(true, 'success', 'todo edited!')
    }
    else{
      const newTodo = { id: uuid(), text:todoText, completed:false}
      setTodos([...todos, newTodo])
      setTodoText('')
      showAlert(true, 'success', 'todo added!')
    }
  }

  const showAlert = (show = false, type = '', msg = '')=>{
    setAlert({show, type, msg})
  }
  const clearTodos = ()=>{
    setTodos([])
    showAlert(true, 'danger', 'todos deleted!')
  }

  const deleteTodo = (id)=>{
   const newTodos = todos.filter((todo)=> todo.id !== id)
   setTodos(newTodos)
   showAlert(true, 'danger', 'todo deleted!')
  }

  const checkTodo = (id)=>{
    const newTodos = todos.map((todo)=>{
      if(todo.id === id){
        return {...todo, completed:!todo.completed}
      }
      return todo
    })
    setTodos(newTodos)
  }

  const editTodo = (id)=>{
    setEditFlag(true)
    setEditID(id)
    const currentTodoText = todos.find((todo)=>todo.id === id)
    setTodoText(currentTodoText.text)
  }  

  const filterTodos = ()=>{
    switch(select){
      case 'Completed':
        setFilteredTodos(todos.filter((todo)=> todo.completed ===true))
      break
      case 'Uncompleted':
        setFilteredTodos(todos.filter((todo)=> todo.completed ===false))
      break
      default:
        setFilteredTodos(todos)
      break
    }
  }
  
    return (
      <AppContext.Provider
        value={{todos, todoText, editFlag, editID, alert, select, filteredTodos,
                setTodos, setTodoText, setEditFlag, setEditID, setAlert, setSelect, setFilteredTodos,
                handleSubmit, clearTodos, checkTodo, editTodo, deleteTodo, filterTodos}}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useGlobalContext = () => {
  return useContext(AppContext);
  };
  
  export { AppContext, AppProvider };
