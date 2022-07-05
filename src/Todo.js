import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'

const Todo = ({todo, editTodo, checkTodo, deleteTodo})=>{
    const { completed, text, id} = todo
    return (
        <div className={`todoDiv ${completed ? 'todoCompleted' : null}`}>
          <button onClick={()=>editTodo(id)}>
            <FaEdit/>
          </button>
          <h4>{text}</h4>
        <div>
          <button onClick={()=>checkTodo(id)}>
            {completed ? 'uncheck': 'check'}
          </button>
          <button onClick={()=>deleteTodo(id)}>
            <FaTrash/>
          </button>
        </div>
      </div>
    )
}

export default Todo