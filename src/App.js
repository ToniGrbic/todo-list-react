import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import Form from './Form'
import { useGlobalContext } from './context'

function App() {
  const { todos, select, alert, clearTodos, filterTodos  } = useGlobalContext()

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  
  useEffect(()=>{
    filterTodos()
  }, [select, todos])

  return (
  <div className="container">
    <h1>Todo List</h1>
    {alert.show && 
    <Alert/>}
    <Form />

     {  todos.length > 0 && 
      (<div className="listDiv">
        <List/>
        <button 
        className='clearBtn' 
        onClick={clearTodos}>
        clear items
        </button>
      </div>
      )}  
  </div>
)
}

export default App
