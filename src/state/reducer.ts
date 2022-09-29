import { TodoAppState, ITodo, IAction, actionType } from "../types/todos"

const reducer = (state:TodoAppState, action:IAction):TodoAppState=>{
    let newTodos:ITodo[] = []
    const { payload, type} = action
    
    switch (type){
        case actionType.SHOW_ALERT:
            state = {...state, alert: payload}
        break
        case actionType.SET_EDIT_ID:
            state={...state, editID: payload}
        break
        case actionType.SET_EDIT_FLAG:
            state={...state, editFlag: payload}
        break
        case actionType.SET_FILTERED_TODOS:
            state={...state, filteredTodos:payload}
        break
        case actionType.SET_TODOS:
            state={...state, todos:payload}
        break
        case actionType.SET_SHOW_SELECT:
            state= {...state, select:payload}
        break
        case actionType.SET_SORT_SELECT:
            state= {...state, sort:payload}
        break
        case actionType.SET_TODO_TEXT:
            state={...state, todoText:payload}
        break
        case actionType.SET_DATE_TIME:
            state={...state, dateTime:payload}
        break
        case actionType.DELETE_TODOS:
            if(state.select === 'All')
               newTodos = []
            else if(state.select === 'Completed')
                newTodos = state.todos.filter((todo)=> !todo.completed)
            else if(state.select === 'Uncompleted')
                newTodos = state.todos.filter((todo)=> todo.completed)
            state = {...state, todos:newTodos }
        break
        case actionType.ADD_TODO:
              state = {...state, todos:[...state.todos, payload]}
        break
        case actionType.DELETE_TODO:
            newTodos = state.todos.filter((todo)=> todo.id !== payload)
            state={...state, todos:newTodos}
        break
        case actionType.CHECK_TODO:
             newTodos = state.todos.map((todo)=>{
                if(todo.id === payload){
                  return {...todo, completed:!todo.completed}
                }
                return todo
              })
              state={...state, todos:newTodos}
        break
        case actionType.EDIT_TODO:
             newTodos = state.todos.map((todo:ITodo)=>{
                if(todo.id === state.editID){
                  return {...todo, text: state.todoText}
                }
                return todo
              })
              state={...state, todos:newTodos}
        break
        case actionType.MOVE_TODO:
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