import React from 'react'
import {Banner} from '../assets/img/index'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col text-center'
        style={{minWidth: '50%', width: '50%'}}
      >
        <span>Page Not Found</span>
        <img src={Banner} alt="None" className='w-full h-3/5 object-cover'/>
        <button type="button" className='w-full h-8 bg-green-500 text-white'>
            Home Page
        </button>
      </div>
    </div>
  )
}

export default NotFound
