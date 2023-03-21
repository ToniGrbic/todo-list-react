import React, { useLayoutEffect, useRef, useState, ReactElement } from 'react'
import { List, Alert, Form, Modal } from './components'
import { useGlobalContext } from './state/context'
import autoAnimate from '@formkit/auto-animate'
import { TodoAppContext } from './types/todos'
import data from "./state/todos.json"

const App:React.FC = ():ReactElement=> {

  const { select, alert, filteredTodos } = useGlobalContext() as TodoAppContext
  const todoParentDiv = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState<boolean>(false)  

  useLayoutEffect(()=>{
    todoParentDiv.current && autoAnimate(todoParentDiv.current)
    console.log(data.todos)
  },[todoParentDiv])
  
  return (
  <div className="container">
    <h1>Todo List</h1>
    <div style={{height:'3.5rem'}}>
      { alert.show && <Alert/>}
    </div>
   
    {showModal && 
    <Modal description={`Are you sure to delete ${select}?`}
           setShowModal={setShowModal}/>}
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
)}

export default App
