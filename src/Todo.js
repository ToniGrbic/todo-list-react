import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import {BsChevronUp, BsChevronDown} from 'react-icons/bs'
import { useGlobalContext } from './context';
import { FaCheckSquare } from 'react-icons/fa'
const Todo = ({todo})=>{

    const { completed, text, id} = todo
    const { editTodo, checkTodo, deleteTodo, moveTodoUpDown} = useGlobalContext()
    
    return (
        <div className={`todoDiv ${completed ? 'todoCompleted' : null}`}>
          <button style={{height:"25px"}}onClick={()=>editTodo(id)}>
            <FaEdit/>
          </button>
          <div style={{maxWidth:"360px"}} >
            <h4 className="todoText">{text}</h4>
          </div>

        <div className="todoButtonsContainer">
          <button onClick={()=>checkTodo(id)}>
              <FaCheckSquare style={{height:"20px"}}/>
          </button>
          <button onClick={()=>deleteTodo(id)}>
            <FaTrash/>
          </button>
          <button className="bsChev" 
            onClick={()=>moveTodoUpDown(id, 'Up')}>
            <BsChevronUp />
          </button>
          <button className="bsChev" 
            onClick={()=>moveTodoUpDown(id, 'Down')}>
            <BsChevronDown />
          </button>
        </div>
      </div>
    )
}

export default Todo