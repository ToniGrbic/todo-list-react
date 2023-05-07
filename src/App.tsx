import React, { useLayoutEffect, useRef, useState, ReactElement } from 'react'
import { List, Alert, Form, Modal, ClearButton } from './components'
import { useGlobalContext } from './state/context'
import autoAnimate from '@formkit/auto-animate'
import { TodoAppContext } from './types/todos'

const App = ():ReactElement=> {

  const { select, alert, filteredTodos } = useGlobalContext() as TodoAppContext
  const todoParentDiv = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState<boolean>(false)  

  useLayoutEffect(()=>{
    todoParentDiv.current && autoAnimate(todoParentDiv.current)
  },[todoParentDiv])
  
  return (
  <div className="container">
    <h1>Todo List</h1>
    <div style={{height:"3.5rem"}}>
      { alert.show && <Alert/>}
    </div>

    {showModal && 
      <Modal select={select} setShowModal={setShowModal}/>
    }
    <Form />

    <div className="listDiv" ref={todoParentDiv}>
     {filteredTodos.length > 0 && 
      (<>
        <ClearButton select={select} setShowModal={setShowModal}/>
        <List/>
      </>
      )}  
    </div>
  </div>
)}

export default App
