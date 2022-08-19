import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'
const Form = () => {
    const { todoText, editFlag, handleSubmit, handleTodoText, handleSelect } =
     useGlobalContext()
     
    const inputRef = React.useRef()
    useEffect(()=>{
        inputRef.current.focus()
    },[])

    return (
        <>
        <form id="Form" onSubmit={handleSubmit} >
            <div className="submitDiv">
                <input type="text" name="" id="text-input" 
                    value={todoText} ref={inputRef}
                    onChange={(e)=>handleTodoText(e.target.value)}/>
                <button type="submit" id="submit" value="Submit">
                    <h3>{editFlag ? 'Edit' : 'Submit'}</h3>
                </button>
            </div>
            <select name="select" id="selectOption" 
                onChange={(e)=>handleSelect(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Uncompleted">Uncompleted</option>
            </select>
        </form>     
        </>
    )
}

export default Form