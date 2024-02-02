import './App.css';
import React, { useState } from 'react';

function Todo2() {
    let [task, setTask] = useState('');
    let [tasksList, setTasksList] = useState([]);
    let [editIndex, setEditIndex] = useState(false);
    let [id, setid] = useState();
    let [search, setsearch] = useState("");
    let [store, setstore] = useState([]);


    let btnhandler = () => {
        if (editIndex) {
            let result = [...tasksList];
            result[id].task = task; // assuming your task objects have a 'task' property
            setTasksList(result);
            setEditIndex(false);
        } else {
            setTasksList([...tasksList, { task, completed: false }]); // storing tasks as objects
            setstore([...tasksList, { task, completed: false }]); // storing tasks as objects

        }
        setTask("");
    };

    let deleteHandler = (index) => {
        let del = tasksList.filter((ele, ind1) => {
            return index !== ind1;
        });
        setTasksList(del);
        setstore(del);
    };

    let editHandler = (index) => {
        setTask(tasksList[index].task);
        setid(index);
        setEditIndex(true);
    };

    let toggleComplete = (index) => {
        let updatedTodos = [...tasksList];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTasksList(updatedTodos);
        setstore(updatedTodos);
    };

    let searchHandler = () => {
        var data = store.filter((ele, index) => {
            return ele.task === search;
        });
        setTasksList(data);
        setsearch("");
    };

    let completebtn = () => {
        let btn = store.filter((ele, ind) => {
            return ele.completed == true;
        })
        setTasksList(btn);
    }

    let uncompletebtn = () => {
        let btn = store.filter((ele, ind) => {
            return ele.completed == false;
        })
        setTasksList(btn);
    }

    let allbtn = () => {
        setTasksList([...store]);
    }

    return (
        <>
            <center>
                <h1 className='header'>TO DO LIST</h1>
                <div className='list'>
                    <input type='text' placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)}></input>
                    <button onClick={btnhandler}>Add Task</button>
                </div>
                <div className='add_btn'>

                    <button onClick={completebtn}>Completed Tasks</button>
                    <button onClick={uncompletebtn}>Uncompleted Tasks</button>
                    <button onClick={allbtn}>All Tasks</button>
                    <br></br><br></br>
                    <input type='text' placeholder='Search task..' value={search} onChange={(e) => setsearch(e.target.value)} />
                    <button onClick={searchHandler}>Search</button>
                </div>
                <ul>
                    {tasksList.map((taskObj, index) => (
                        <li key={index}>
                            <input type="checkbox" checked={taskObj.completed} onChange={() => toggleComplete(index)} />
                            <span style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>{taskObj.task}</span>
                            <button onClick={() => deleteHandler(index)}>DELETE</button>
                            <button onClick={() => editHandler(index)}>EDIT</button>
                        </li>
                    ))}
                </ul>
            </center>
        </>                                         
    );
}

export default Todo2;
