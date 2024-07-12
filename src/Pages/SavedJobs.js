import axios from 'axios'
import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const SavedJobs = () => {

    const [user, setUser] = useState(null);
    const [savedJobsData, setSavedJobsData] = useState([]);
    const [errors, setErrors] = useState('');
    const storedUser = localStorage.getItem('user');
    const Navigate = useNavigate();
    const [loading , setLoading]= useState(false);
    useEffect(() => {
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);
    if (user?.role === 'recruitor') {
        Navigate('/');
    }

    // const getSavedJobsdata = async () => {
    //     try {
    //         const response= await axios.get(`http://localhost:8000/saved_jobs?userId=${user?.id}`);
    //         const savedJob=response.data;
    //         const jobDetailsPromises = savedJob.map(savedJob =>
    //            axios.get(`http://localhost:8000/jobs/${savedJob.jobId}`));

    //         const jobDetailsResponse = await Promise.all(jobDetailsPromises);
    //         const jobDetails= jobDetailsResponse.map(res=>res.data);
    //         setSavedJobsData(jobDetails);
    //         console.log(savedJobsData);    
    //         // // setLoading(true);
    //         // const savedJobs = await axios.get(`http://localhost:8000/saved_jobs?user_id=${user?.id}`);
    //         //     setSavedJobsData(savedJobs.data);
    //         //     // setLoading(false);
    //         // console.log(savedJobsData);
    //     } catch (error) {
    //         // setLoading(false);
    //         console.log("Error in Fetching Saved jobs", error);
    //         setErrors("Error in Fetching Saved Jobs");
    //     }
    // }

    const getSavedJobsData = async () => {
        try {
            // Fetch saved jobs for the user
            // loading(true);
            const response = await axios.get(`http://localhost:8000/saved_jobs?userId=${user?.id}`);
            const savedJobs = response.data;
    
            // Fetch details for each saved job
            const jobDetailsPromises = savedJobs.map(savedJob => 
                axios.get(`http://localhost:8000/jobs?jdUid=${savedJob.jobId}`).catch(error => ({ error }))
            );
    
            const jobDetailsResponse = await Promise.all(jobDetailsPromises);
    
            // Filter out any failed requests
            const jobDetails = jobDetailsResponse
                .filter(res => !res.error)
                .map(res => res.data);
    
            // Update state with fetched job details
            setSavedJobsData(jobDetails);
    
            // Log the saved jobs data
            console.log("Jobs",jobDetails);
        } catch (error) {
            // loading(false);
            console.error("Error in Fetching Saved jobs", error);
            setErrors("Error in Fetching Saved Jobs");
        }
    }
    

    useEffect(() => {
     getSavedJobsData();  
    }, [user])
 

    return (
        <div>
            <h1 className='text-3xl font-semibold'>Saved Jobs</h1>
            <h2 className=''>Here are the Jobs that you saved for later on</h2>
            {
                savedJobsData.length == 0 ? (
                    // empty array oncdition

                    <div className='w-full h-[50vh] flex flex-col justify-center items-center space-y-2 '>
                        <h1 className='text-4xl font-semibold text-gray-300 '>No Jobs Saved</h1>
                        <h2 className='text-md font-md text-gray-300 '>Go to Home Section to Save some jobs</h2>

                    </div>
                ) : (
                    
                    // Data Present Condition
                    <div className='flex md:grid grid-cols-4 my-10'>
                        {
                            savedJobsData.map((item, index) => {

                                return (
                                    <>
                                    <div key={index}>

                                    {item.map((job,index)=>(
                                        <JobCard key={index}
                                            jdUid={job.jdUid}
                                            jobRole={job.jobRole}
                                            jobLocation={job.location}
                                            jobDesc={job.jobDetailsFromCompany}
                                            jobImg={job.logoUrl}
                                            jobCurrency={job.salaryCurrencyCode}
                                            jobminExp={job.minExp}
                                            jobmaxExp={job.maxExp}
                                        />
                                    ))}
                                        
                                    </div>

                                    </>
                                )
                            })
                        }
                    </div>


                )
            }
        </div>
    )
}

export default SavedJobs
