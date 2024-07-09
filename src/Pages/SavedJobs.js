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

    const getSavedJobsdata = async () => {
        try {
            // setLoading(true);
            const savedJobs = await axios.get(`http://localhost:8000/saved_jobs?user_id=${user?.id}`);
                setSavedJobsData(savedJobs.data);
                // setLoading(false);
            console.log(savedJobsData);
        } catch (error) {
            // setLoading(false);
            console.log("Error in Fetching Saved jobs", error);
            setErrors("Error in Fetching Saved Jobs");
        }
    }

    useEffect(() => {
        getSavedJobsdata();
    }, [])


    return (
        <div>
            <h1 className='text-3xl font-semibold'>Saved Jobs</h1>
            <h2 className=''>Herer are the Jobs that you saved for later on</h2>
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
                        <Spinner/>
                        {
                            savedJobsData.map((item, index) => {

                                return (
                                    <>
                                        <JobCard key={index}
                                            jdUid={item.jdUid}
                                            jobRole={item.jobRole}
                                            jobLocation={item.location}
                                            jobDesc={item.jobDetailsFromCompany}
                                            jobImg={item.logoUrl}
                                            jobCurrency={item.salaryCurrencyCode}
                                            jobminExp={item.minExp}
                                            jobmaxExp={item.maxExp}
                                        />

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
