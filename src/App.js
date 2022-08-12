import React, { useEffect, useRef } from 'react'
import List from './components/List'
import Alert from './components/Alert'
import Form from './components/Form'
import { useGlobalContext } from './context'
import autoAnimate  from '@formkit/auto-animate'

function App() {
  const { todos, select, alert, clearTodos, filterTodos  } = useGlobalContext()
  const todoParentDiv = useRef(null)

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  
  useEffect(()=>{
    filterTodos()
  }, [select, todos])

  useEffect(()=>{
    todoParentDiv.current && autoAnimate(todoParentDiv.current)
  },[todoParentDiv])

  return (
  <div className="container">
    <h1>Todo List</h1>
    {
    alert.show && <Alert/>
    }
    <Form />

     {  todos.length > 0 && 
      (<div className="listDiv" 
        ref = {todoParentDiv}>
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
