import React, { ReactElement } from "react";
import { FaEdit } from "react-icons/fa";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext, TodoProps } from "../../types/todos";
import TodoButtons from "./TodoButtons";

const Todo = ({ todo, index }: TodoProps): ReactElement => {
  const { completed, text, id, dateTime } = todo;
  const { editTodo } = useGlobalContext() as TodoAppContext;

  return (
    <div className={`todoDiv ${completed ? "todoCompleted" : null}`}>
      <div>
        <div className="indexNumber">{index + 1}</div>
        <button style={{ height: "25px" }} 
                onClick={() => editTodo(id)}>
          <FaEdit />
        </button>
      </div>

      <div className="todoText">
        {dateTime.date && (
          <h4 className="dateTime">
            {dateTime.date} Time: {dateTime.time}
          </h4>
        )}
        <h4>{text}</h4>
      </div>
      <TodoButtons id={id} />
    </div>
  );
};

export default Todo;
