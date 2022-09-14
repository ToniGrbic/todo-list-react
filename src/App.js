import React,{ useEffect, useRef, useState } from 'react'
import { List, Alert, Form, Modal } from './components'
import { useGlobalContext } from './context'
import autoAnimate  from '@formkit/auto-animate'

function App() {
  const { todos, select, alert, deleteTodos, filterTodos, filteredTodos  } = useGlobalContext()
  const todoParentDiv = useRef(null)
  const [showModal, setShowModal] = useState(false)  
  
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
   
    {showModal && 
      <Modal description={`Are you sure to delete ${select}?`}
             setShowModal={setShowModal}
             deleteTodos={deleteTodos}/>} 

    <Form />
    <div className="listDiv" 
         ref={todoParentDiv}>
     {filteredTodos.length > 0 && 
      (<>
        <button 
          className='clearBtn' 
          onClick={()=>setShowModal(true)}>
          Delete {select}
        </button>
        <List/>
      </>
      )}  
    </div>
  </div>
)
}

export default App
