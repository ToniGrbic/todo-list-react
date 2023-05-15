import React, {useContext, useReducer, useEffect, useCallback} from "react";
import { TodoAppContext, ITodo, TodoAppState, actions, providerProps,} from "../types/todos";
import { getLocalStorage, sortByDate, sortByCreated } from "../utils/utils";
import reducer from "./reducer";
const uuid = require("react-uuid");

const defaultState: TodoAppState = {
  todos: getLocalStorage(),
  todoText: "",
  dateTime: { date: "", time: "" },
  editID: null,
  editFlag: false,
  alert: { show: false, type: "", msg: "" },
  select: "All",
  sort: "Newest",
  filteredTodos: [],
};

const AppContext = React.createContext<TodoAppContext | null>(null);

const AppProvider = ({ children }: providerProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const showAlert = (
    show: boolean = true,
    type: string = "",
    msg: string = ""
  ) => {
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "alert", value: { show, type, msg } },
    });
  };

  const deleteTodos = () => {
    dispatch({ type: actions.DELETE_TODOS });
    showAlert(true, "danger", "todos deleted!");
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: actions.DELETE_TODO, payload: id });
    showAlert(true, "danger", "todo deleted!");
  };

  const checkTodo = (id: string) => {
    dispatch({ type: actions.CHECK_TODO, payload: id });

    const currentTodo = state.todos.find((todo) => todo.id === id);
    if (currentTodo?.completed) {
      showAlert(true, "danger", "todo uncompleted!");
    } else {
      showAlert(true, "success", "todo completed!");
    }
  };

  const editTodo = (id: string) => {
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "editFlag", value: true },
    });
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "editID", value: id },
    });

    const currentTodo = state.todos.find((todo) => todo.id === id);
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "todoText", value: currentTodo?.text },
    });

    const { date, time } = currentTodo!.dateTime;
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "dateTime", value: { date, time } },
    });
  };

  const handleDateTime = (value: string) => {
    const dateAndTime = value.split("T");
    const [date, time] = dateAndTime;
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "dateTime", value: { date, time } },
    });
  };

  const handleTodoText = (value: string) => {
    if (value.length < 50)
      dispatch({
        type: actions.SET_STATE,
        payload: { key: "todoText", value },
      });
    else {
      showAlert(true, "danger", "max number of charachters reached");
    }
  };

  const handleShowSelect = (value: string) => {
    dispatch({ type: actions.SET_STATE, payload: { key: "select", value } });
  };

  const handleSortSelect = (value: string) => {
    dispatch({ type: actions.SET_STATE, payload: { key: "sort", value } });
  };

  const moveTodo = (id: string, type: string) => {
    if (type === "Up") {
      dispatch({ type: actions.MOVE_TODO, payload: { id, delta: -1 } });
    } else if (type === "Down") {
      dispatch({ type: actions.MOVE_TODO, payload: { id, delta: 1 } });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.todoText) {
      showAlert(true, "danger", "input empty, cant sumbit!");
    } else if (state.todoText && state.editFlag) {
      dispatch({ type: actions.EDIT_TODO });
      dispatch({
        type: actions.SET_STATE,
        payload: { key: "editFlag", value: false },
      });
      showAlert(true, "success", "todo edited!");
    } else {
      const newTodo = {
        id: uuid(),
        createdAt: new Date().getTime(),
        text: state.todoText,
        dateTime: state.dateTime,
        completed: false,
      } as ITodo;

      if (state.sort === "Date Ascending" || state.sort === "Date Descending")
        dispatch({
          type: actions.SET_STATE,
          payload: { key: "sort", value: "Newest" },
        });

      if (state.sort === "Oldest")
        dispatch({ type: actions.ADD_TODO_END, payload: newTodo });
      else if (state.sort === "Newest")
        dispatch({ type: actions.ADD_TODO_BEGINING, payload: newTodo });

      showAlert(true, "success", "todo added!");
    }
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "todoText", value: "" },
    });
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "dateTime", value: { date: "", time: "" } },
    });
  };

  const filterTodos = useCallback((): void => {
    let filteredTodos;

    switch (state.select) {
      case "Completed":
        filteredTodos = state.todos.filter((todo) => todo.completed);
        break;
      case "Uncompleted":
        filteredTodos = state.todos.filter((todo) => !todo.completed);
        break;
      default:
        filteredTodos = state.todos;
        break;
    }
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "filteredTodos", value: filteredTodos },
    });
  }, [state.todos, state.select]);

  
  const sortTodos = useCallback((): void => {
    let sortedTodos;
    const todos = [...state.todos];

    switch (state.sort) {
      case "Date Ascending":
        sortedTodos = todos.sort((a, b) => sortByDate(a.dateTime, b.dateTime));
        break;
      case "Date Descending":
        sortedTodos = todos.sort((a, b) => sortByDate(b.dateTime, a.dateTime));
        break;
      case "Oldest":
        sortedTodos = todos.sort((a, b) =>
          sortByCreated(a.createdAt, b.createdAt)
        );
        break;
      case "Newest":
        sortedTodos = todos.sort((a, b) =>
          sortByCreated(b.createdAt, a.createdAt)
        );
        break;
    }
    dispatch({
      type: actions.SET_STATE,
      payload: { key: "todos", value: sortedTodos },
    });
  }, [state.sort]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    filterTodos();
  }, [filterTodos]);

  useEffect(() => {
    sortTodos();
  }, [sortTodos]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleSubmit,
        handleTodoText,
        handleShowSelect,
        handleSortSelect,
        deleteTodos,
        deleteTodo,
        checkTodo,
        handleDateTime,
        showAlert,
        editTodo,
        moveTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
