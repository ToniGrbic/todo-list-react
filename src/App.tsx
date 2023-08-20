import React, { useEffect, useRef, useState, ReactElement } from "react";
import { List, Alert, Form, Modal, ClearButton } from "./components";
import { useGlobalContext } from "./state/context";
import autoAnimate from "@formkit/auto-animate";
import { TodoAppContext } from "./types/todos";

const App = (): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const todoParentEl = useRef<HTMLDivElement>(null);
  const { todos, select, filterTodos } = 
         useGlobalContext() as TodoAppContext;

  useEffect(() => {
    if (todoParentEl.current) autoAnimate(todoParentEl.current);
  }, [todoParentEl])

  const filteredTodos = React.useMemo(
   () => filterTodos(todos, select),
  [todos, select]);

  return (
    <div className="container">
      {showModal && 
       <Modal setShowModal={setShowModal} select={select} />}
      <h1>Todo List</h1>
      <Alert />
      <Form />
      <div className="listDiv" ref={todoParentEl}>
        {filteredTodos.length > 0 && (
          <>
            <ClearButton 
                select={select} 
                setShowModal={setShowModal} />
            <List filteredTodos={filteredTodos}/>
          </>
        )}
      </div>
    </div>
  ); 
};
export default App;
