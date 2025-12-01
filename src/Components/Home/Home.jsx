import React from 'react'
import TaskList from '../TaskList/TaskList'
import { useParams } from 'react-router-dom'

function Home({tasks, setTasks}) {

  const {type} = useParams()

  const today = new Date().toISOString().split("T")[0];
  
  const filteredTasks = tasks.filter(task =>{
      if(type === "today") return task.date === today;
      if(type === "completed") return task.isComplete === true;
      if(type === "pending") return task.isComplete === false;

      return true;
    });

  return (
    <div className='flex overflow-hidden flex-col justify-center items-center bg-neutral-100 p-4'>
        <div className='w-6xl h-auto overflow-hidden bg-white rounded-sm shadow-gray-400 shadow-lg border-1 border-gray-300'>
          <div className='w-5.5xl h-auto m-6 border-1 border-gray-300 text-xs text-gray-400 rounded-sm p-2'>
            <TaskList tasks={filteredTasks} setTasks={setTasks}/>
          </div>
        </div>
    </div>
  )
}

export default Home