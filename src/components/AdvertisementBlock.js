import React from 'react'

const AdvertisementBlock = () => {
  return (
    <div className='w-full h-[40vh]'>
      <img  className='h-full w-full object-contain'src={'https://cdn.icon-icons.com/icons2/625/PNG/512/newsletter_icon-icons.com_57399.png'}alt='ad imge'/>
      <h1>Subscribe To Our NewsLetter</h1>
      <button className='border border-gray-800 text-xl font-semibold text-white'>Subscribe</button>
    </div>
  )
}

export default AdvertisementBlock
