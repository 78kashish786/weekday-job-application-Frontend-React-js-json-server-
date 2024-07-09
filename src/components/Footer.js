import React from 'react'

const Footer = () => {
  return (
    <div className='flex mt-20 justify-between text-sm text-gray-500 items-center px-16 py-1 border-t border-t-gray-200 bg-white  w-full bottom-1'>
      <h1>
        WeekDay@2024 AllRights Reserved
      </h1>
      <div className='flex gap-5  '>
      <ul className='flex gap-3'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Contact</h1>
      </ul>
      <div className='flex gap-2'>
      <img src={require('../Assets/india.png')} className='rounded-full h-[25px] w-[25px] object-cover ' alt='country-flag'/>
      <h1>India</h1>
      </div>
      </div>
    </div>
  )
}

export default Footer
