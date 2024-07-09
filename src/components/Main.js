import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Main = ({children}) => {
  return (
    <>
    <Header/>
    <div className='md:px-16 px-4'>
    {children}
    </div>
    
    </>
   
  )
}

export default Main
