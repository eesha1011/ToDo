import React from 'react'
import Header from '../Header/Header'

function Pending() {
  return (
    <div className='flex overflow-hidden flex-col justify-center items-center bg-neutral-100 p-4'>
        <div className='w-6xl h-auto overflow-hidden bg-white rounded-sm shadow-gray-400 shadow-lg border-1 border-gray-300'>
          <div className='w-5.5xl h-140 m-6 border-1 border-gray-300 flex justify-center items-center text-xs text-gray-400 rounded-sm'>No data to display</div>
        </div>
    </div>
  )
}

export default Pending