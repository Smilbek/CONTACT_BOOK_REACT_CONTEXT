import React, {useContext, useState} from 'react';
import { todoContext } from '../../context/TodoContext';


const AddTodo = () => {
    const [inpValue1, setInpValue1]= useState('')
    const [inpValue2, setInpValue2]= useState('')
    const [inpValue3, setInpValue3]= useState('')
    const {addTask} = useContext(todoContext)
    
    
    function handleClick () {
        let newObj = {
            name: inpValue1,
            surname: inpValue2,
            phone: inpValue3,
            status: false
        }
        addTask(newObj)
        setInpValue1('')
        setInpValue2('')
        setInpValue3('')//очищаем input
    }
    return (
        <div>
            <input value={inpValue1} onChange={(e) => setInpValue1(e.target.value)} type ="text" />
            <input value={inpValue2} onChange={(e) => setInpValue2(e.target.value)} type ="text" />
            <input value={inpValue3} onChange={(e) => setInpValue3(e.target.value)} type ="number" />
            <button onClick={handleClick}>Add</button>

        </div>
    );
};

export default AddTodo;