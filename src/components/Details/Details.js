import React, { useContext, useEffect, useState } from 'react';
import { todoContext } from '../../context/TodoContext';
import { Link } from 'react-router-dom'
const Details = () => {
    const { taskToDetails, getContactsDetail} = useContext(todoContext)
    const [data,setData] = useState(taskToDetails)
    console.log(taskToDetails);
    useEffect(() => {
        setData(taskToDetails)
        
    }, [taskToDetails])
    console.log(taskToDetails);

    return (
        <div>
                <ul>
                    <li>{data.name}</li>
                    <li>{data.surname}</li>
                    <li>{data.phone}</li>
                    <Link to="/">
                    <button>Back</button>
                    </Link>
                </ul>
        </div>
    );
};

export default Details;
