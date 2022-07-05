import React from 'react'

import Todo  from './Todo'
const List = ({todos, editTodo, checkTodo, deleteTodo}) => {
  return (
    <>
      {todos.map((todo)=>{
      return (
        <Todo key={todo.id} todo={todo} editTodo={editTodo} 
        checkTodo={checkTodo} deleteTodo={deleteTodo}/>
      )})
    }
    </>
  )
}

export default List
