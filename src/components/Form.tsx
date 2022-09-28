import React, { useLayoutEffect, useRef, ReactElement } from 'react'
import { useGlobalContext } from '../state/context'
import { TodoAppContext } from '../types/todos'


const Form:React.FC = ():ReactElement => {
    const { todoText, editFlag, handleSubmit, handleTodoText, 
            handleDateTime, handleSelect } = useGlobalContext() as TodoAppContext
     
    const inputRef = useRef<HTMLInputElement>(null)

    useLayoutEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }         
    },[editFlag])
    return (
        <>
        <form id="Form" onSubmit={handleSubmit}>
            <div className="datetimeDiv">
                <label>Date & Time:  </label>
                <input type="datetime-local" name="date-time" 
                       onChange={(e)=>handleDateTime(e.target.value)}/>
            </div>
            <div className="submitDiv">
                <input type="text" name="text" id="text-input" 
                    value={todoText} ref={inputRef}
                    onChange={(e)=>handleTodoText(e.target.value)}/>
                <button type="submit" id="submit" value="Submit">
                    <h3>{editFlag ? 'Edit' : 'Submit'}</h3>
                </button>
            </div>
            
            <div>
            <select name="select" id="selectOption" 
                onChange={(e)=>handleSelect(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Uncompleted">Uncompleted</option>
            </select>
            </div>
        </form>     
        </>
    )
}

export default Form