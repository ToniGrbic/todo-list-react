import { TodoAppState, ITodo, IAction, actions as act } from "../types/todos"

const reducer = (state:TodoAppState, action:IAction):TodoAppState=>{
    let newTodos: ITodo[] = [];
    const { payload, type} = action
    
    switch (type){
        case act.SHOW_ALERT:
            state = {...state, alert: payload}
        break
        case act.SET_EDIT_ID:
            state={...state, editID: payload}
        break
        case act.SET_EDIT_FLAG:
            state={...state, editFlag: payload}
        break
        case act.SET_FILTERED_TODOS:
            state={...state, filteredTodos:payload}
        break
        case act.SET_TODOS:
            state={...state, todos:payload}
        break
        case act.SET_SHOW_SELECT:
            state= {...state, select:payload}
        break
        case act.SET_SORT_SELECT:
            state= {...state, sort:payload}
        break
        case act.SET_TODO_TEXT:
            state={...state, todoText:payload}
        break
        case act.SET_DATE_TIME:
            state={...state, dateTime:payload}
        break
        case act.DELETE_TODOS:
            if(state.select === 'All')
               newTodos = []
            else if(state.select === 'Completed')
                newTodos = state.todos.filter((todo)=> !todo.completed)
            else if(state.select === 'Uncompleted')
                newTodos = state.todos.filter((todo)=> todo.completed)
            state = {...state, todos:newTodos }
        break
        case act.ADD_TODO_END:
              state = {...state, todos:[...state.todos, payload]}
        break
        case act.ADD_TODO_BEGINING:
            state = {...state, todos:[payload, ...state.todos]}
        break
        case act.DELETE_TODO:
            newTodos = state.todos.filter((todo)=> todo.id !== payload)
            state={...state, todos:newTodos}
        break
        case act.CHECK_TODO:
             newTodos = state.todos.map((todo)=>{
                if(todo.id === payload){
                  return {...todo, completed:!todo.completed}
                }
                return todo
              })
              state={...state, todos:newTodos}
        break
        case act.EDIT_TODO:
             newTodos = state.todos.map((todo:ITodo)=>{
                if(todo.id === state.editID){
                  return {...todo, text: state.todoText}
                }
                return todo
              })
              state={...state, todos:newTodos}
        break
        case act.MOVE_TODO:
            const { id, delta } = payload
            newTodos = [...state.todos];
              
            const currentTodo = newTodos.find(todo=>todo.id === id)
            const currentIndex = newTodos.indexOf(currentTodo as ITodo)
            newTodos.splice(currentIndex, 1);

            let newIndex = currentIndex + delta
            if(newIndex > newTodos.length){
                newIndex = 0;
            }else if(newIndex < 0){
                newIndex = newTodos.length
            }

            newTodos.splice(newIndex, 0, currentTodo as ITodo);
            state={...state, todos:newTodos}
        break
        default:
            throw new Error('no matching action type')
    }
    return state
}

export default reducer