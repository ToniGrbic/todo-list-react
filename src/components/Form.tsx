import React, { useLayoutEffect, useRef, ReactElement } from 'react'
import { useGlobalContext } from '../state/context'
import { TodoAppContext } from '../types/todos'
import FormSelect from './FormSelect'
const showArr = ["All", "Completed", "Uncompleted"]
const sortArr = ["Newest", "Oldest", "Date Ascending", "Date Decending"];

const Form = ():ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { todoText, editFlag, dateTime, handleSubmit, handleTodoText, 
            handleDateTime, handleShowSelect, handleSortSelect } = useGlobalContext() as TodoAppContext
    
    useLayoutEffect(()=>{
        if(inputRef.current)
           inputRef.current.focus()      
    },[editFlag])

    return (
        <form id="Form" onSubmit={handleSubmit}>
          <div className="datetimeDiv">
            <label htmlFor='date-time'>Date & Time: </label>
            <input
              type="datetime-local"
              name="date-time"
              value={dateTime.date + "T" + dateTime.time}
              onChange={(e) => handleDateTime(e.target.value)}
            />
          </div>
          <div className="submitDiv">
            <input
              type="text"
              id="text-input"
              value={todoText}
              ref={inputRef}
              onChange={(e) => handleTodoText(e.target.value)}
            />
            <button type="submit" id="submit" value="Submit">
              <h3>{editFlag ? "Edit" : "Submit"}</h3>
            </button>
          </div>
          <FormSelect handleSelect={handleShowSelect} options={showArr} type="Show"/>
          <FormSelect handleSelect={handleSortSelect} options={sortArr} type="Sort By"/>
        </form>
    );
}
export default Form