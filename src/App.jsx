// import './App.css'

import { Route, Routes, useParams } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import PendingPage from "./Pages/PendingPage"
import CompletedPage from "./Pages/CompletedPage"
import AddTaskPage from "./Pages/AddTaskPage"
import EditPage from "./Pages/EditPage"
import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [tasks, setTasks] = useState([])

  const savedTasks = async () => {
    try{
      const response = await axios.get("https://api.freeapi.app/api/v1/todos");
      console.log("API Response", response.data);

      const todos = response.data?.data || [];

        setTasks(todos);
    } catch (error){
      console.error("Error in fetching data", error);
    }
  }

  useEffect(() => {
    savedTasks()
  }, []);

  // useEffect(() => {
  //   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //   setTasks(savedTasks);
  // }, []);
  // useEffect(() => {
  //   if (tasks.length) {
  //     localStorage.setItem("tasks", JSON.stringify(tasks))
  //   }
  // }, [tasks])

  return (
    <Routes>
      <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
      <Route path="/:type" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
      <Route path="addTask" element={<AddTaskPage tasks={tasks} setTasks={setTasks} />} />
      <Route path="editTask/:id" element={<EditPage tasks={tasks} setTasks={setTasks} />} />
    </Routes>
  )
}

export default App
