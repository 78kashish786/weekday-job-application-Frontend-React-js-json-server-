    import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import { CiLocationOn } from "react-icons/ci";
    import { IoMdBookmark } from "react-icons/io";
    import { useNavigate } from 'react-router-dom';

    const JobCard = ({ jobRole, jobLocation, jobDesc, jobImg, jobCurrency, jobmaxExp, jobminExp, jdUid }) => {
        
        const Navigate = useNavigate();
        const [jobId, setJobId]= useState('');
        const [message,setMessage]= useState('');
        const [user, setUser]=useState(null);

        useEffect(()=>{
            const storedUser = localStorage.getItem('user');
            if(storedUser){
                setUser(JSON.stringify(storedUser));
            }
        },[])
        
        

        return (
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
                    <h1 className=' py-1 border  border-pink-400 rounded-sm bg-pink-300 text-[12px] font-bold px-2 '>{jobminExp || jobmaxExp ? `${jobminExp} - ${jobmaxExp}yr` : '0+ yr'}</h1>
                    <h1>{jobCurrency}</h1>
                </div>
                <div className='flex justify-between gap-2 '>
                    <button onClick={()=>Navigate(`/${jdUid}`, {jdUid})}  className='w-[50%] border border-bg-gray-900 text-center p-2 border font-semibold text-white bg-gray-900 hover:bg-white hover:text-gray-900 border-gray-900'>Apply</button>
                    <button  className='w-[50%] border border-blue-500 text-blue-500 font-semibold text-center  p-2 border'><div className='flex gap-2 items-center justify-center'><h1>Save</h1><IoMdBookmark />
                    </div>
                    </button>
                </div>
            </div>
        )
    }

    export default JobCard


// const handleOnSaveJob= async(e)=>{
    //     e.preventDefault();
    //     setJobId(jdUid);
    //     try {
    //         const userResponse = await axios.get(`http://localhost:8000/users?id=${user.id}`);
    //         const userData =userResponse.data;

    //         if(!user.savedJobs.includes(jobId)){
    //             user.savedJobs.push(jobId);

    //             await axios.put(`http://localhost:8000/users?id=${user.id}/saved_jobs`);
    //             setMessage('Job Saved Successfully');
    //         }else{
    //             setMessage('Job is Already Saved');
    //         }
            

    //     } catch (error) {
    //         console.error('Error adding job:', error);
    //   setMessage('Error adding job');
    //     }
    // }