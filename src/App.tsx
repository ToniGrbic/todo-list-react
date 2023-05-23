import React, { useEffect, useRef, useState, ReactElement } from "react";
import { List, Alert, Form, Modal, ClearButton } from "./components";
import { useGlobalContext } from "./state/context";
import autoAnimate from "@formkit/auto-animate";
import { TodoAppContext } from "./types/todos";

const App = (): ReactElement => {
  const { select, filteredTodos } = useGlobalContext() as TodoAppContext;
  const todoParentDiv = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    todoParentDiv.current && 
    autoAnimate(todoParentDiv.current);
  }, [todoParentDiv]);

  return (
    <div className="container">
      <h1>Todo List</h1>
      {showModal && 
       <Modal setShowModal={setShowModal} 
              select={select}
       />}
      <Alert />
      <Form />
      <section className="listDiv" 
               ref={todoParentDiv}>
        {filteredTodos.length > 0 && (
          <>
            <ClearButton 
                select={select} 
                setShowModal={setShowModal}/>
            <List />
          </>
        )}
      </section>
    </div>
  );
};
export default App;
