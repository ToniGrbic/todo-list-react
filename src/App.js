import React,{useEffect, useRef} from 'react'
import { List, Alert, Form } from './components'
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
    <div style={{height:'3rem'}}>
      {
        alert.show && <Alert/>
      }
    </div>
    <Form />
    <div className="listDiv" 
         ref={todoParentDiv}>
     {todos.length > 0 && 
      (<>
        <List/>
        <button 
          className='clearBtn' 
          onClick={clearTodos}>
          delete all
        </button>
      </>
      )}  
    </div>
  </div>
)
}

export default App
