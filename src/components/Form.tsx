import React, { useLayoutEffect, useRef, ReactElement } from 'react'
import { useGlobalContext } from '../state/context'
import { TodoAppContext } from '../types/todos'


const Form = ():ReactElement => {
    const { todoText, editFlag, sort, handleSubmit, handleTodoText, 
            handleDateTime, handleShowSelect, handleSortSelect } = useGlobalContext() as TodoAppContext
     
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
            <div className="selectDiv">
                <label htmlFor="">Show: </label>
                <select name="select"
                        onChange={(e)=>handleShowSelect(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Uncompleted">Uncompleted</option>
                </select>
            </div>
            <div className="selectDiv">
                <label>Sort By: </label>
                <select name="sort" 
                        value={sort}
                        onChange={(e)=>handleSortSelect(e.target.value)}>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Date Ascending">Date Ascending</option>
                    <option value="Date Descending">Date Descending</option>
                </select>
            </div>
            </div>
        </form>     
        </>
    )
}

export default Form