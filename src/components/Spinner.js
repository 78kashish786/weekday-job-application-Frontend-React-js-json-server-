import React from 'react'

const Spinner = () => {
  return (
   <div className='absolute top-0 left-0 right-0 w-[100vw] h-[100vh] bg-white flex justify-center items-center'>
     <img className='h-[70px] animate-pulse' src={require('../Assets/WeekdayLogo.jpg')} alt='spinner'/>
   </div>
  )
}

export default Spinner
