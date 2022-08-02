
const reducer = (state, action)=>{
    let newTodos
    switch (action.type){
        case 'SHOW_ALERT':
            state = {...state, alert: action.payload}
        break
        case 'CLEAR_TODOS':
            state = {...state, todos: []}
        break
        case 'DELETE_TODO':
            newTodos = state.todos.filter((todo)=> todo.id !== action.payload)
            state={...state, todos:newTodos}
        break
        case 'CHECK_TODO':
             newTodos = state.todos.map((todo)=>{
                if(todo.id === action.payload){
                  return {...todo, completed:!todo.completed}
                }
                return todo
              })
              state={...state, todos:newTodos}
        break
        case 'SET_EDIT_ID':
            state={...state, editID: action.payload}
        break
        case 'SET_EDIT_FLAG':
            state={...state, editFlag: action.payload}
        
        break
        case 'ADD_TODO':
              state = {...state, todos:[...state.todos, action.payload]}
        break
        case 'SET_TODOS':
            state={...state, todos:action.payload}
        break
        case 'SET_FILTERED_TODOS':
            state={...state, filteredTodos:action.payload}
        break
        case 'SET_SELECT':
            state= {...state, select:action.payload}
        break
        case 'SET_TODO_TEXT':
            state={...state, todoText:action.payload}
        break
        case 'MOVE_TODO':
            const moveUpDown = (id, delta) =>{
                const newTodos = [...state.todos];
              
                const currentTodo = newTodos.find(todo=>todo.id === id)
                const currentIndex = newTodos.indexOf(currentTodo)
                newTodos.splice(currentIndex, 1);

                let newIndex = currentIndex + delta
                if(newIndex > newTodos.length){
                    newIndex = 0;
                }else if(newIndex < 0){
                    newIndex = newTodos.length
                }

                newTodos.splice(newIndex, 0, currentTodo);
                state={...state, todos:newTodos}
            }
            if(action.payload.type === 'Up'){
                moveUpDown(action.payload.id, -1)
            }
            if(action.payload.type === 'Down'){
                moveUpDown(action.payload.id, 1)
            }
        break
        default:
            throw new Error('no matching action type')
    }
    return state
}

export default reducer