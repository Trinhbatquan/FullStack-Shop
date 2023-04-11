import React from 'react'

const ProfileTabs = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(345)
    }

  return (





    <form 
        onSubmit={handleSubmit}
        className='flex flex-col'
        style={{minWidth: '50%', width: '50%'}}
    >

        <div className='w-full flex items-center justify-evenly mb-6'>
            <div className=''
                style={{minWidth: '40%', width: '40%'}}
            >
                <label htmlFor='id1'>
                    USERNAME
                </label>
                <input id='id1' name="id1" value="" className='w-full h-16 bg-slate-300'/>
            </div>
            <div className=''
                style={{minWidth: '40%', width: '40%'}}
            >
                <label htmlFor='id2'>
                    EMAIL ADDRESS
                </label>
                <input id='id2' name="id2" value="" className='w-full h-16 bg-slate-300'/>
            </div>
        </div>


        <div className='w-full flex items-center justify-evenly mb-6'>
            <div className=''
                style={{minWidth: '40%', width: '40%'}}
            >
                <label htmlFor='id3'>
                    NEW PASSWORD
                </label>
                <input id='id3' name="id3" value="" className='w-full h-16 bg-slate-300'/>
            </div>
            <div className=''
                style={{minWidth: '40%', width: '40%'}}
            >
                <label htmlFor='id4'>
                    CONFIRM PASSWORD
                </label>
                <input id='id4' name="id4" value="" className='w-full h-16 bg-slate-300'/>
            </div>
        </div>


        <button
            className='w-full bg-green-600 text-center h-14 flex items-center justify-center'
            type="submit"
        >
            UPDATE PROFILE
        </button>

    </form>
  )
}

export default ProfileTabs