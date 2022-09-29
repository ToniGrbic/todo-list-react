import React, { ReactElement } from 'react'
import Todo  from './Todo'
import { useGlobalContext } from '../state/context'
import { TodoAppContext } from '../types/todos'
const List:React.FC = ():ReactElement => {
  const { filteredTodos } = useGlobalContext() as TodoAppContext
  
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
