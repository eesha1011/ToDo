import React from 'react'
import AddTask from '../Components/AddTask/AddTask'
import Header from '../Components/Header/Header'

function AddTaskPage({tasks, setTasks}) {
  return (
    <div>
        <Header/>
        <AddTask setTasks={setTasks}/>
    </div>
  )
}

export default AddTaskPage