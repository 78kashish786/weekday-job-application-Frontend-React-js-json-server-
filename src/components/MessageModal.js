import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '20%',
      height:'20vh',
      transform: 'translate(-50%, -50%)',
    },
  };
const MessageModal = ({message, success=true}) => {
    const [openmodal, setOpenModal]=useState(true);
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setOpenModal(false);
        },2000)
        return()=>clearInterval(intervalId);
        
    },[])
  return (
    <Modal
          isOpen={openmodal}
          style={customStyles}
          contentLabel="Example Modal"
          className='flex justify-center items-center '
        >
        <h1 className={success?"text-xl font-semibold text-green-400":"text-xl font-semibold text-red-400"}>{message}</h1>
    </Modal>
  )
}

export default MessageModal
