import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom';

function AddTask({setTasks}) {
    const [addTask, setAddTask] = useState({
        title: "",
        priority: "",
        deadline: "",
        comments: "",
        id: Date.now(),
        status: "pending",
        date: new Date().toISOString().split("T")[0],
    })

    const newTask = {...addTask, id: Date.now(),}

    const handleTaskInput = (e) => {
        const {name, value} = e.target;

        setAddTask((prev) => ({...prev, [name]: value}));
    }
    
    const navigate = useNavigate();

    const handleTaskSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting Task", addTask);

        try {
            const response = await axios.post("https://api.freeapi.app/api/v1/todos", {
                title: addTask.title,
                description: addTask.comments,
                // date: addTask.date,
                // deadline: addTask.deadline,
                // id: addTask.id,
                // completed: false,
            });

            console.log("✅ Task created:", response.data);

            // const newApiTask = {
            //      id: response.data?.data?._id || Date.now(),
            //      title: response.data?.data?.title || addTask.title,
            //      description: response.data?.data?.description || addTask.comments,
            //     //  status: response.data?.data?.completed ? "completed" : "pending",
            //     //  priority: addTask.priority,
            //     //  deadline: addTask.deadline,
            //     //  date: addTask.date,
            // }

            // setTasks((prev) => [...prev, newApiTask]);

            setAddTask({
                title: "",
                priority: "",
                deadline: "",
                comments: "",
                id: Date.now(),
                status: "pending",
                date: new Date().toISOString().split("T")[0],
            });

            navigate("/");

        } catch (error) {
            console.error("❌ Error creating task:", error);
            alert("Task create karte waqt error aaya. Try again!");     
        }
        
    }

    // const handleTaskSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(addTask);
        
    //     setTasks(prev => {
    //         const updatedTasks = [...prev, newTask];

    //             localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    //             return updatedTasks;
    //         });

    //     // let oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    //     // oldTasks.push(addTask);
    //     // console.log(oldTasks);

    //     // localStorage.setItem("tasks", JSON.stringify(oldTasks));

    //     // setTasks((prev) => [...prev, {...addTask, completed: false}]);
    //     // console.log(setTasks);

    //     setAddTask({
    //         title: "",
    //         priority: "",
    //         deadline: "",
    //         comments: "",
    //         id: Date.now(),
    //         status: "pending",
    //         date: new Date().toISOString().split("T")[0],
    //     });
        
    //     navigate('/');
    // }

  return (
    <div className='flex justify-center items-center bg-gray-100 p-4'>
        <div className='w-130 flex flex-col justify-center items-center rounded-lg bg-white shadow-lg shadow-neutral-600'>
            <h1 className='text-3xl font-semibold text-left'>Task Details</h1>
            <form onSubmit={handleTaskSubmit}>
                <div className='w-120 flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' placeholder='Add a task title' required value={addTask.title} onChange={handleTaskInput} className='text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col w-60'>
                            <label htmlFor="priority">Priority</label>
                            <input type="text" name='priority' placeholder='Select priority' required value={addTask.priority} onChange={handleTaskInput} className='text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                        </div>
                        <div className='flex flex-col w-60'>
                            <label htmlFor="deadline">Deadline</label>
                            <input type="date" name='deadline' placeholder='Select Date' required value={addTask.deadline} onChange={handleTaskInput} className='text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="comment">Comments</label>
                        <textarea type="text" name='comments' placeholder='Add any comments to your task' required value={addTask.comments} onChange={handleTaskInput} className='h-20 text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                    </div>
                </div>
                <div className='flex justify-end items-center gap-3 my-10'>
                    <Link to={'/'} type='button' className='w-30 text-center border-1 border-green-800 rounded-md p-2 cursor-pointer hover:bg-neutral-100'>Close</Link>
                    <button type='submit' className='w-30 bg-green-800 rounded-md text-white p-2 cursor-pointer hover:bg-green-700'>Add Task</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTask