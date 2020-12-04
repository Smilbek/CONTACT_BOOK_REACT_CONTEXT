import React, { useReducer } from 'react';
import axios from 'axios'

export const todoContext = React.createContext();

const INIT_STATE = {
    todos: [],//5)новый Todos попадает сюда
    taskToEdit: null,
    taskToDetails:{
        name: '',
        surname: '',
        phone: ''
    }
}

const reducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case "GET_TODOS_DATA"://4)reducer понимает что произошел action "getTodosData"
            return {...state, todos: action.payload}//и возвращает новый State, в котором заменяется todos на новую data
        case "EDIT_TODO":
            return {...state, taskToEdit: action.payload}

        case "DETAILS_TODO":
            return {...state, taskToDetails: action.payload}

        default: return state

    }
}

const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getTodosData = async () => {//1)срабатывает action
        let { data } = await axios('http://localhost:8012/todos')//2)Action отправляет запрос на АПИ и в ответ получаем data
        dispatch({//3)data отправляется в reducer
            type: "GET_TODOS_DATA",
            payload: data
        })
    }

    const addTask = async (newObj) => {
        await axios.post ('http://localhost:8012/todos', newObj)
        // .then(res => console.log(res))

        getTodosData()
    }

    const changeStatus = async (id) => {
        let {data} = await axios(`http://localhost:8012/todos/${id}`)
        
        await axios.patch(`http://localhost:8012/todos/${id}`, {status: !data.status})
        getTodosData()
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8012/todos/${id}`)
        getTodosData()
    }

    const editTodo = async (id) => {
        let { data } = await axios (`http://localhost:8012/todos/${id}`)
        dispatch({
            type: "EDIT_TODO",
            payload: data
        })
    }

    
    const detailsTodo = async (id) => {
        let { data } = await axios (`http://localhost:8012/todos/${id}`)
        dispatch({
            type: "DETAILS_TODO",
            payload: data
        })
    }

    const saveTask = async (newTask, history) => {
        try{
            await axios.patch(`http://localhost:8012/todos/${newTask.id}`, newTask)
            history.push('/')
        }catch(error){
            history.push('/')
        }
    }

    return (
        <todoContext.Provider value={{
            todos: state.todos,//6)новый Todos отправляем в наши компоненты Todolist
            taskToEdit: state.taskToEdit,
            taskToDetails: state.taskToDetails,

            addTask,            
            getTodosData,
            changeStatus,
            deleteTask,
            editTodo,
            saveTask,
            detailsTodo
        }}>
            {children}
        </todoContext.Provider>
    )
}
export default TodoContextProvider;