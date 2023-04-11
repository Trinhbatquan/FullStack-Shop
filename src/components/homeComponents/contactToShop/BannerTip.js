


import React from 'react'

import {Banner} from '../../../assets/img'

const BannerTip = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
    }


  return (
    <div 
        className='w-full my-auto flex items-center justify-center'
        style={{minHeight: '360px', backgroundImage: `url(${Banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
    >


        <div 
            className='flex flex-col items-center justify-center text-center w-full'
        >
            <h2 className='text-3xl font-semibold text-slate-800 mb-1'>DO YOU NEED MORE TIPS?</h2>
            <p className='text-slate-700 text-lg pb-4'>Sign up free and get the latest tips.</p>
            <form 
                onSubmit={handleSubmit}
                className='px-1 py-4 relative'
                style={{minWidth: '70%'}}
            >
                <input placeholder='Your email...'
                    type="email"
                    name="email"
                    className='text-center py-3 bg-primary opacity-90 placeholder:text-slate-500
                    rounded-3xl outline-none focus:opacity-100 focus:shadow-lg placeholder:text-md text-md duration-300 transition-all
                    focus:bg-white'
                    style={{minWidth: '80%'}}
                />
                <input 
                    value="YES. I WANT!"
                    name="subscribe"
                    type="submit"
                    className='absolute right-16 text-white px-10 py-4 rounded-3xl text-xs
                    backdrop-blur-md cursor-pointer hover:bg-green-600 font-semibold'
                    style={{backgroundColor: "#1cb803"}}
                />
            </form>
        </div>


    </div>
  )
}

export default BannerTip