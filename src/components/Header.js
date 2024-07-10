import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import Modal from 'react-modal';
import UploadJobForm from './UploadJobForm';
import { useNavigate, useParams } from 'react-router-dom';
import MessageModal from './MessageModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const dialogboxStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '20%',
    transform: 'translate(-50%, -50%)',
  }
}

const Header = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [logoutmodalIsOpen, setLogoutIsOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [ storedUser])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <>
      <div className='flex items-center justify-between px-4 py-1 md:px-16  sticky top-0 bg-white'>
        <img className='h-[60px]'src={require('../Assets/WeekdayLogo.jpg')} alt="Log"/>
        <ul className='flex gap-5 text-gray-800 font-md text-sm'>
        <li><a href='/saved_jobs'>Saved Jobs</a></li>
      </ul>
        <div className='flex gap-5'>
          {user && user?.role === 'recruitor' ? (<button onClick={openModal} className='my-4 border rounded-sm font-semibold text-green-400  px-3 py-2 border-green-400'>Upload Job</button>) : ("")}
          {
            storedUser && user ? (
              <>
                <div className='flex p-2 items-center gap-2 px-4 rounded-sm  relative'>
                  {/* <div className='bg-green-300 absolute   w-[100%]  pb-5 px-2'>
              <ul>
                <li>Profile</li>
                <li>Profile</li>
                <li>Profile</li>
                <li>Profile</li>
              </ul>
            </div> */}
                  <div className='space-y-[-1] '>
                    <h1 className='text-[16px] font-semibold'>{user && user.role === 'seeker' ? user.name : user.company}</h1>
                    <h2 className='text-[14px] font-md text-blue-300 '>{user && user.email}</h2>
                  </div>
                  <img src={user.companyLogo ? user.companyLogo : `https://st2.depositphotos.com/2904097/6144/v/450/depositphotos_61440299-stock-illustration-vector-avatar-user-icon.jpg`} alt='Company Logo' className='h-[45px] w-[45px] rounded-full ' />
                  <FaAngleDown size={20} className='text-gray-600' />
                </div>

                <button className='border border-red-400 text-red-400 font-semibold py-2 px-4 my-4' onClick={() => setLogoutIsOpen(true)}>Logout</button>
              </>
            ) : ("")
          }
        </div>
      </div>
      {/* Modal */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <UploadJobForm closeModal={closeModal} />
        </Modal>
      </div>

      <div>
        <Modal
          isOpen={logoutmodalIsOpen}
          onRequestClose={closeModal}
          style={dialogboxStyle}
          contentLabel="Confirmation Modal"
        >
          <div className='space-y-10'>
            <h1>Do you really want to Log out ?</h1>
            <div className='flex justify-between gap-1 items-center '>
              <button className='w-[50%] border border-gray-900 bg-gray-900 text-white py-2 px-4 ' onClick={() => {
                localStorage.removeItem('user');
                setUser(null);
                setLogoutIsOpen(false);
                Navigate('/login');
              }}>Log Out</button>
              <button className='w-[50%] bg-white border border-gray-900 text-gray-900 py-2 px-4 ' onClick={() => setLogoutIsOpen(false)}>Cancel</button>
            </div>
          </div>

        </Modal>

      </div>

    </>
  )
}

export default Header
