import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditTask({tasks, setTasks}) {

  const {id} = useParams();
  const navigate = useNavigate();

  const [editTask, setEditedTask] = useState({
    title: "",
    priority: "",
    deadline: "",
    comments: "",
  });

  useEffect(() => {

    // if(!id) return;

    const fetchedTasks = async () => {

      try {
        const response = await axios.get(`https://api.freeapi.app/api/v1/todos/${id}`);
        const xyz =  response.data.data || response.data;
          setEditedTask({
          title: xyz.title || "",
          comments: xyz.description || "",
        });

        console.log("Edit CLicked, Now Fetching Data....", response.data);
        

      } catch (error){
        console.error("Error fetching task:", error);
      }
    }; 
    
    fetchedTasks();

    // const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // if (tasks[id]) {
    //   setEditedTask(tasks[id]);
    // }
  }, [id]);

  const handleEditTask = (e) => {
    const {name, value} = e.target;
    setEditedTask((prev) => ({...prev, [name]: value}));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`https://api.freeapi.app/api/v1/todos/${id}`, editTask);
      alert("Task updated successfully!");

      navigate("/");

    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }

    

    // let updatedTasks = [...tasks];
    // updatedTasks[id] = editTask;
    // setTasks(updatedTasks);
    // localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // navigate("/"); 
  };

  return (
    <div className='flex justify-center items-center bg-gray-100 p-4'>
        <div className='w-130 flex flex-col justify-center items-center rounded-lg bg-white shadow-lg shadow-neutral-600'>
            <h1 className='text-3xl font-semibold text-left'>Edit Task</h1>
            <form onSubmit={handleEditSubmit}>
                <div className='w-120 flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' placeholder='Add a task title' required value={editTask.title} onChange={handleEditTask} className='text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col w-60'>
                            <label htmlFor="priority">Priority</label>
                            <input type="text" name='priority' placeholder='Select priority' required value={editTask.priority} onChange={handleEditTask} className='text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                        </div>
                        <div className='flex flex-col w-60'>
                            <label htmlFor="deadline">Deadline</label>
                            <input type="date" name='deadline' placeholder='Select Date' required value={editTask.deadline} onChange={handleEditTask} className='text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="comments">Comments</label>
                        <textarea type="text" name='comments' placeholder='Add any comments to your task' required value={editTask.comments} onChange={handleEditTask} className='h-20 text-sm border-1 rounded-sm border-gray-300 p-1.5' />
                    </div>
                </div>
                <div className='flex justify-end items-center gap-3 my-10'>
                    <Link to={'/'} type='button' className='w-30 text-center border-1 border-green-800 rounded-md p-2 cursor-pointer hover:bg-neutral-100'>Close</Link>
                    <button type='submit' className='w-30 bg-green-800 rounded-md text-white p-2 cursor-pointer hover:bg-green-700'>Update Task</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditTask