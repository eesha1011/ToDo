import React, { useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';

function TaskList({tasks, setTasks}) {
    // const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //     try {
    //         let savedTasks = localStorage.getItem("tasks")
    //         if(savedTasks){
    //             savedTasks = JSON.parse(savedTasks);
    //             if(Array.isArray(savedTasks)){
    //             setTasks(savedTasks);
    //             } else{
    //                 setTasks([]);
    //             }
    //         } else{
    //             setTasks([]);
    //         }
    //         console.log(savedTasks);
    //     } catch (error) {
    //         console.error("Error parsing tasks:", error);
    //         setTasks([]);
    //     }   
    // }, []);

    const toggleCompleted = async (id) => {
        try {

            console.log("Toggle the Checkbox", id);
            

            const response = await axios.patch(`http://localhost:5000/api/todos/toggle/status/${id}`);
            
            console.log("Toggle Response:", response.data);
            alert("Yay!! Task Completed..");

            const updatedTask = response.data.data;
            
            const updatedTasks = tasks.map((task) =>
                task._id === id ? response.data.data : task);

            setTasks(updatedTasks);


        } catch (error) {
            console.error("Error toggling status:", error);
            alert("Failed to toggle task status");
        }
    }

    // const toggleCompleted = (id) => {
    //     const updatedTask = tasks.map((task) => {
    //         if(task.id === id){
    //             return {...task, status: task.status === "pending" ? "completed" : "pending"}
    //         }
    //         return task;
    //     })
    //     setTasks(updatedTask);
    //     // localStorage.setItem("tasks", JSON.stringify(updatedTask));
    // };

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/todos/${id}`)
            const updatedTasks = tasks.filter(task => task._id !== id);
            setTasks(updatedTasks);
            alert("deleted successfully");
        } catch (error) {
            console.error("Error", error);
            
        }
    }

    // const deleteTask = (id) => {
    //     const updatedTasks = tasks.filter(task => task.id !== id);
    //     setTasks(updatedTasks);
    //     // localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // };

  return (
    <div>
        {tasks?.length === 0 ? (
            <div className="flex justify-center items-center text-gray-400">
                No data to display
            </div>
        ) : (
            <ul className="space-y-2">
                {tasks?.map((task) => {
                    const isOverdue = task.status === "pending" && new Date(task.deadline) < new Date();
                    return(
                        <li key={task._id} className={`py-1 px-2 border rounded shadow-sm flex justify-between items-center ${isOverdue ? "bg-red-100 border-red-500" : ""}`}>
                            <div className='flex gap-2'>
                                <input type="checkbox" checked={task.status === "Completed"} onChange={() => toggleCompleted (task._id)} className='mr-2' />
                                <div>
                                    <span className='text-lg font-semibold text-gray-700'>{task.title}</span>
                                    <p><span className="font-medium">Deadline: </span> {task.isComplete}</p>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <Link to={`/editTask/${task._id}`} className="text-gray-800 px-3 py-1 rounded hover:bg-orange-200"><Pencil size={18}/></Link>

                                <button onClick={() => deleteTask(task._id)} className='text-gray-800 px-3 py-1 rounded hover:bg-red-300'><Trash2 size={18}/></button>
                            </div>
                        </li>
                    ) 
                })}
            </ul>   
        )}
    </div>
  )
}

export default TaskList