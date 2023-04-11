import React from 'react'

import {BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'

const Rating = ({value}) => {


  return (
    <div className='flex items-center justify-center'>


      <i>
        {
            +value > 1 && ( <BsStarFill className=' text-sm font-semibold'
              style={{color: '#1cb803'}}
            />)
        }
        {
            +value < 1 && (+value > 0) && (  <BsStarHalf className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
        {
            +value == 0 && ( <BsStar className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
      </i>


      <i>
        {
            +value >= 2 && ( <BsStarFill className=' text-sm font-semibold'
              style={{color: '#1cb803'}}
            />)
        }
        {
            +value < 2 && (+value > 1) && (  <BsStarHalf className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
        {
            +value <= 1 && ( <BsStar className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
      </i>


      <i>
        {
            +value >= 3 && ( <BsStarFill className=' text-sm font-semibold'
              style={{color: '#1cb803'}}
            />)
        }
        {
            +value < 3 && (+value > 2) && (  <BsStarHalf className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
        {
            +value <= 2 && ( <BsStar className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
      </i>


      <i>
        {
            +value >= 4 && ( <BsStarFill className=' text-sm font-semibold'
              style={{color: '#1cb803'}}
            />)
        }
        {
            +value < 4 && (+value > 3) && (  <BsStarHalf className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
        {
            +value <= 3 && ( <BsStar className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
      </i>


      <i>
        {
            +value >= 5 && ( <BsStarFill className=' text-sm font-semibold'
              style={{color: '#1cb803'}}
            />)
        }
        {
            +value <  5 && (+value > 4) &&(  <BsStarHalf className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
        {
            +value <= 4 && ( <BsStar className=' text-sm font-semibold'
            style={{color: '#1cb803'}} />)
        }
      </i>
    </div>
  )
}

export default Rating
