import React, { ReactElement } from "react";
import { ITodo } from "../../types/todos";
import Todo from "./Todo";

const List = ({filteredTodos}: {
  filteredTodos: ITodo[];
}): ReactElement => {
  return (
    <>
      {filteredTodos.map((todo, index) => {
        return <Todo key={todo.id} todo={todo} index={index} />;
      })}
    </>
  );
};
export default List;

