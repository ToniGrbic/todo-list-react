import React, { ReactElement } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { useGlobalContext } from '../state/context';
import { FaCheckSquare } from 'react-icons/fa'
import { TodoAppContext, TodoProps } from '../types/todos';

const Todo:React.FC<TodoProps> = 
    ({todo, index}:TodoProps):ReactElement=>{

    const { completed, text, id, dateTime} = todo 
    const { editTodo, checkTodo, deleteTodo, moveTodo } = 
            useGlobalContext() as TodoAppContext
    
    return (
        <div className={`todoDiv ${completed ? 'todoCompleted' : null}`}>
          <div>
            <div className='indexNumber'>
              {index + 1}
            </div>
            <button style={{height:"25px"}}
                    onClick={()=>editTodo(id)}>
              <FaEdit/>
            </button>
          </div>
          
          <div className="todoText">
            {dateTime.date &&
              <h4 className="dateTime">
                {dateTime.date} Time: {dateTime.time}
              </h4>}
            <h4>{text}</h4>
          </div>

        <div className="todoButtonsContainer">
          <button onClick={()=>checkTodo(id)}>
            <FaCheckSquare />
          </button>
          <button onClick={()=>deleteTodo(id)}>
            <FaTrash/>
          </button>
          <button className="bsChev" 
                  onClick={()=>moveTodo(id, 'Up')}>
            <BsChevronUp />
          </button>
          <button className="bsChev" 
                  onClick={()=>moveTodo(id, 'Down')}>
            <BsChevronDown />
          </button>
        </div>
      </div>
    )
}

export default Todo