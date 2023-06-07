import React, { ReactElement, useEffect, useRef } from "react";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";

const TextInput = (): ReactElement => {
  const { todoText, editFlag, handleTodoText } 
      = useGlobalContext() as TodoAppContext;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && todoText===""){
      inputRef.current!.focus();
      console.log(todoText)
    } 
      
  }, [editFlag, todoText]);

  return (
    <div className="submitDiv">
      <input
        type="text"
        id="text-input"
        value={todoText}
        ref={inputRef}
        onChange={(e) => handleTodoText(e.target.value)}
      />
      <button type="submit" id="submit">
        <h3>{editFlag ? "Edit" : "Submit"}</h3>
      </button>
    </div>
  );
};

export default TextInput;
