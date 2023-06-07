import React from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { FaCheckSquare, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";

const TodoButtons = ({ id }: { id: string }) => {
  const { checkTodo, deleteTodo, moveTodo } =
    useGlobalContext() as TodoAppContext;
  return (
    <div className="todoButtonsContainer">
      <button onClick={() => checkTodo(id)}>
        <FaCheckSquare />
      </button>
      <button onClick={() => deleteTodo(id)}>
        <FaTrash />
      </button>
      <button onClick={() => moveTodo(id, "Up")}
              className="bsChev">
        <BsChevronUp />
      </button>
      <button onClick={() => moveTodo(id, "Down")}
              className="bsChev">
        <BsChevronDown />
      </button>
    </div>
  );
};

export default TodoButtons;
