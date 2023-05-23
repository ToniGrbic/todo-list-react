import { TodoAppState, ITodo, IAction, actions as act } from "../types/todos";

const reducer = (state: TodoAppState, action: IAction): TodoAppState => {
  let newTodos: ITodo[] = [];
  const { payload, type } = action;

  switch (type) {
    case act.SET_STATE:
      state = { ...state, [payload.key]: payload.value };
      break;
    case act.DELETE_TODOS:
      if (state.select === "All") newTodos = [];
      else if (state.select === "Completed")
        newTodos = state.todos.filter((todo) => !todo.completed);
      else if (state.select === "Uncompleted")
        newTodos = state.todos.filter((todo) => todo.completed);
      state = { ...state, todos: newTodos };
      break;
    case act.ADD_TODO_END:
      state = { ...state, todos: [...state.todos, payload] };
      break;
    case act.ADD_TODO_BEGINING:
      state = { ...state, todos: [payload, ...state.todos] };
      break;
    case act.DELETE_TODO:
      newTodos = state.todos.filter((todo) => todo.id !== payload);
      state = { ...state, todos: newTodos };
      break;
    case act.CHECK_TODO:
      newTodos = state.todos.map((todo) => {
        if (todo.id === payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      state = { ...state, todos: newTodos };
      break;
    case act.EDIT_TODO:
      newTodos = state.todos.map((todo: ITodo) => {
        if (todo.id === state.editID)
          return { ...todo, text: state.todoText, dateTime: state.dateTime };
        return todo;
      });
      state = { ...state, todos: newTodos };
      break;
    case act.MOVE_TODO:
      const { id, delta } = payload;
      newTodos = [...state.todos];

      const currentTodo = newTodos.find((todo) => todo!.id === id);
      const currentIndex = newTodos.indexOf(currentTodo!);
      newTodos.splice(currentIndex, 1);

      let newIndex = currentIndex + delta;
      if (newIndex > newTodos.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = newTodos.length;
      }

      newTodos.splice(newIndex, 0, currentTodo!);
      state = { ...state, todos: newTodos };
      break;
    default:
      throw new Error("no matching action type");
  }
  return state;
};

export default reducer;
