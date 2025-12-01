import React from 'react'
import Header from '../Components/Header/Header'
import EditTask from '../Components/EditTask/EditTask'

function EditPage({tasks, setTasks}) {
  return (
    <div>
        <Header/>
        <EditTask tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}

export default EditPage