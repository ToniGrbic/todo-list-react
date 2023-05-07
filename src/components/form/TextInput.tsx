import React, { ReactElement, useLayoutEffect, useRef } from "react";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";

const TextInput = (): ReactElement => {
  const { todoText, editFlag, handleTodoText } =
    useGlobalContext() as TodoAppContext;
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [editFlag]);

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
