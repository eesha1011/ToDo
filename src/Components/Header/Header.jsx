import axios from 'axios';
import { FileSearch, TextSearch} from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'

function Header({setTask}) {

  const {type} = useParams();

  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) return alert("Please enter a search term!");

    console.log("Search krna hai....", search);

    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/todos?query=${search}`);
      console.log("Data Fetch ho rha hai...", response.data.data);

      setTask(response.data.data);
      
      navigate("/");

    } catch (error) {
      console.error("Oops!! Error aa gyi....");
      alert("Error aa gyii!!!");
      
    }
  };

  const baseClass = "w-40 text-center text-md p-2 cursor-pointer";
  const activeClass = "bg-green-800 text-white hover:bg-green-700";
  const inactiveClass = "bg-gray-200 text-black hover:bg-gray-300";

  return (

    <div className='flex overflow-hidden flex-col justify-center items-center bg-neutral-100 p-4'>
        <div style={{backgroundImage: "url('https://t3.ftcdn.net/jpg/02/30/65/32/360_F_230653258_1SCEgR7iyZLpxP7T8pDPqaPIfHFtl6Qd.jpg   ')"}} className='w-full max-w-6xl h-25 bg-cover bg-center rounded-lg flex justify-center items-center my-3 mx-2'>
            <h1 className='text-white font-bold text-center text-5xl'>TODO APP</h1>
        </div>
        <div className='flex justify-center items-center space-x-1 my-3'>
            <Link to={'/today'} className={`${baseClass} rounded-l-lg ${type === "today" ? activeClass : inactiveClass}`}>Today</Link>
            <Link to={'/pending'} className={`${baseClass} ${type === "pending" ? activeClass : inactiveClass}`}>Pending</Link>
            <Link to={'/completed'} className={`${baseClass} rounded-r-lg ${type === "completed" ? activeClass : inactiveClass}`}>Completed</Link>
        </div>
        <div className='md:w-6xl w-xl mt-8 mb-2 flex justify-between items-center'>
          <Link to={'/'} className='text-3xl font-semibold'>Tasks</Link>
          <div lassName='w-full max-w-6xl mt-8 mb-2 flex flex-col md:flex-row gap-4 justify-between items-center px-2'>
            <input type="text" name='searchbox' placeholder='Search here' onChange={(e) => setSearch(e.target.value)} className='bg-white border border-gray-500 w-full md:w-80 rounded-lg p-2 text-md'/>
            <button className='text-gray-700 text-2xl p-0 w-fit cursor-pointer' onClick={handleSearch}><TextSearch size={35}/></button>
          </div>
          <div>
            <Link to={'/addTask'} className='bg-green-800 text-white text-sm md:text-lg rounded-lg px-3 py-2'>+ Add Task</Link>
          </div>
        </div>
        {/* <div className='w-6xl h-auto overflow-hidden bg-white rounded-sm shadow-gray-400 shadow-lg border-1 border-gray-300'>
          <div className='w-5.5xl h-140 m-6 border-1 border-gray-300 flex justify-center items-center text-xs text-gray-400 rounded-sm'>No data to display</div>
        </div> */}
    </div>

    
  )
}

export default Header



// <div className='w-full flex flex-col justify-center items-center bg-neutral-100 p-4'>
    //   <div style={{backgroundImage: "url('https://t3.ftcdn.net/jpg/02/30/65/32/360_F_230653258_1SCEgR7iyZLpxP7T8pDPqaPIfHFtl6Qd.jpg')"}} 
    //   className='w-full max-w-6xl h-25 bg-cover bg-center rounded-lg flex justify-center items-center my-3 mx-2'>
    //       <h1 className='text-white font-bold text-center text-3xl md:text-5xl'>TODO APP</h1>
    //   </div>
    //   <div className='flex flex-wrap justify-center items-center gap-2 my-3 px-2'>
    //       <Link to={'/today'} className={`${baseClass} w-full md:w-40 text-center rounded-l-lg ${type === "today" ? activeClass : inactiveClass}`}>Today</Link>
    //       <Link to={'/pending'} className={`${baseClass} w-full md:w-40 text-center ${type === "pending" ? activeClass : inactiveClass}`}>Pending</Link>
    //       <Link to={'/completed'} className={`${baseClass} w-full md:w-40 text-center rounded-r-lg ${type === "completed" ? activeClass : inactiveClass}`}>Completed</Link>
    //   </div>
    //   <div className='w-full max-w-6xl mt-6 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2'>
    //       <div className='w-full flex items-center gap-2'>
    //         <input type="text" name='searchbox' placeholder='Search here' 
    //         onChange={(e) => setSearch(e.target.value)} 
    //         className='bg-white border border-gray-500 w-full rounded-lg p-2 text-md'/>
    //         <button className='text-gray-700 text-2xl p-0 cursor-pointer' onClick={handleSearch}>
    //           <TextSearch size={32}/>
    //         </button>
    //       </div>
    //       <Link to={'/addTask'} className='bg-green-800 text-white text-sm md:text-lg rounded-lg px-4 py-2 w-full md:w-auto text-center'>
    //         + Add Task
    //       </Link>
    //   </div>
    // </div>
    