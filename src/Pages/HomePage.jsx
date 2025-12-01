import React from 'react'
import Header from '../Components/Header/Header'
import Home from '../Components/Home/Home'

function HomePage({tasks, setTasks}) {
  return (
    <div>
        <Header setTask={setTasks}/>
        <Home tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}

export default HomePage