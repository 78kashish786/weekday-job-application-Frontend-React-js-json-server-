import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { IoMdBookmark } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import MessageModal from './MessageModal'
import { FaHeartPulse } from 'react-icons/fa6'
import { MdDelete } from "react-icons/md";

const JobCard = ({
  jobRole,
  jobLocation,
  jobDesc,
  jobImg,
  jobCurrency,
  jobmaxExp,
  jobminExp,
  jdUid
}) => {


  const Navigate = useNavigate()
  const [jobId, setJobId] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const check = async () => {
    if (!user) {
      return;
    }

    const response = await axios.get(
      `http://localhost:8000/saved_jobs?userId=${user?.id}&jobId=${jdUid}`
    )

    if (response.data.length > 0) {
      setSaved(true);
      console.log('Saved', saved)
    } else {
      setSaved(false)
    }
  }

  useEffect(() => {
    check()
  }, [user, loading])

  const handleSavedJobs = async () => {
    if (!user) {
      setMessage('You need to log in to Save a Job')
      return
    } else {
      try {
        const response = await axios.post('http://localhost:8000/saved_jobs', {
          jobId: jdUid,
          userId: user?.id
        })
        if (response.status === 201) {
          //   setsuccess(true);
          setLoading(true);
          setMessage('job Saved Successfullly')
        } else {
          // setsuccess(false);
          setLoading(false);
          setMessage('Failed to save a job')
          return
        }
      } catch (error) {
        setLoading("false");
        setMessage('An error occurred while saving the job.')
        console.log('error:', error)
      }
    }
  }
  
  const handleRemoveFromSaved = async()=>{
    try {
      setLoading(true);
      const savedJobCheck = await axios.get('http://localhost:8000/saved_jobs', {params:{userId:user.id,jobId:jdUid}});

      if(savedJobCheck.data.length === 0){
        setMessage("Job not Found");
        setLoading(false);
        return;
      }

      const jobIDtoDelete = savedJobCheck.data[0].id;

      const response = await axios.delete(`http://localhost:8000/saved_jobs`, {params:{id:jobIDtoDelete}});

      if(response.status==200){
        setLoading(true);
        setMessage("Job Removed");
      }else{
        setLoading(false);
        setMessage("Job removal unsuccessfull")
        return;
      }
    } catch (error) {
      console.log("Delete error",error);
    }finally {
      setLoading(false);  // Ensure loading is set to false in both success and error cases
    }
  }

  return (
    <>
      <div className='p-3 border m-1 space-y-5 shadow-sm rounded-sm '>
        <div className='flex justify-start gap-3'>
          <img src={jobImg} className='h-[60px]' />
          <div>
            <h1 className='font-semibold ml-1 text-xl'>{jobRole}</h1>
            <div className='flex gap-1 items-center '>
              <CiLocationOn />
              <h1>{jobLocation}</h1>
            </div>
          </div>
        </div>
        <p className='font-md text-sm'>{jobDesc.substring(0, 160)}</p>
        <div className='flex justify-between items-center '>
          <h1 className=' py-1 border  border-pink-400 rounded-sm bg-pink-300 text-[12px] font-bold px-2 '>
            {jobminExp || jobmaxExp ? `${jobminExp} - ${jobmaxExp}yr` : '0+ yr'}
          </h1>
          <h1>{jobCurrency}</h1>
        </div>
        <div className='flex justify-between gap-2 '>
          <button
            onClick={() => Navigate(`/${jdUid}`, { jdUid })}
            className='w-[50%] border border-bg-gray-900 text-center p-2 border font-semibold text-white bg-gray-900 hover:bg-white hover:text-gray-900 border-gray-900'
          >
            Apply
          </button>
          {location&&location.pathname==='/saved_jobs'?(
            <button
            onClick={handleRemoveFromSaved}
            className='w-[50%] border border-red-500 text-red-500 font-semibold text-center  p-2 border'
          >
            <div className='flex gap-2 items-center justify-center'>
              {/* <h1>{saved ? 'Saved' : 'Save'}</h1> */}
              <h1>Remove</h1>
              <MdDelete />
            </div>
          </button>
          ):(
            <button
            onClick={handleSavedJobs}
            className={saved ? 'w-[50%] border border-blue-500 text-white bg-blue-500 font-semibold text-center  p-2 border' : 'w-[50%] border border-blue-500 text-blue-500 font-semibold text-center  p-2 border'}
          >
            <div className='flex gap-2 items-center justify-center'>
              <h1>{saved ? 'Saved' : 'Save'}</h1>
              <IoMdBookmark />
            </div>
          </button>
          )}
        </div>
      </div>
      {/* {message&&success==true?<MessageModal message={message} success={success}/>:<MessageModal message={message} success={success}/>} */}
    </>
  )
}

export default JobCard
