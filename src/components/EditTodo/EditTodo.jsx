import React, { useContext, useEffect, useState } from 'react';
import { todoContext } from '../../context/TodoContext';
import { Link } from 'react-router-dom'


const EditTodo = (props) => {
    const { taskToEdit, saveTask } = useContext(todoContext);
    const [newEditItem, setNewEditItem] = useState(taskToEdit);
    console.log(taskToEdit)


    useEffect(() =>{
        setNewEditItem(taskToEdit)
    }, [taskToEdit])

    function handleEditInput(e){
        let newTask = {
            ...newEditItem,
            name: e.target.value,
            surname: e.target.value,
            phone: e.target.value
            
        }
        setNewEditItem(newTask)
    }

    return (
        <div>
            {newEditItem ? 
                <>
                    <input onChange={(e)=> {
                        let newTask = {...newEditItem}
                        newTask.name = e.target.value
                        setNewEditItem(newTask)
                    }} value={newEditItem.name} type="text"/>
                    
                    <input onChange={(e)=> {
                        let newTask = {...newEditItem}
                        newTask.surname = e.target.value
                        setNewEditItem(newTask)
                    }} value={newEditItem.surname} type="text"/>

                    <input onChange={(e)=> {
                        let newTask = {...newEditItem}
                        newTask.phone = e.target.value
                        setNewEditItem(newTask)
                    }} value={newEditItem.phone} type="text"/>


                    <button onClick={() => saveTask(newEditItem, props.history)}>Save</button>
                </>
                : <h1>Loading</h1>}
        </div>
    );
};

export default EditTodo;