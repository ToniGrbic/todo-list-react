import React from 'react'
import Todo  from './Todo'
import { useGlobalContext } from '../context'
const List = () => {
  const { filteredTodos } = useGlobalContext()
  return (
    <>
     {filteredTodos.map((todo, index)=>{
      return (
        <Todo key={todo.id} todo={todo} index={index}/>
      )})
    }
    </>
  )
}

export default List
