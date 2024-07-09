import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import SingleJobComponent from '../components/SingleJobComponent';
import JobCard from '../components/JobCard';

const JobDetail = () => {
    const [singleJobData, setsingleJobData]= useState([]);
    const [relatedData,setRelatedData]= useState([]);
    const params= useParams();
    const jdUid = params.jdUid; 

    useEffect(() => {
        fetch('http://localhost:8000/jobs?jdUid='+jdUid)
          .then(res => {
            return res.json()
          })
          .then(data => {
            console.log(data)
            setsingleJobData(data);
            return fetch(`http://localhost:8000/jobs?jobRole=${data[0].jobRole}&_limit=6`);
          }).then((res)=>res.json()).then((data)=>{setRelatedData(data)}).catch((error)=>{
            console.log("Errorin Fething data",error)
          })
        //   ;
      }, [jdUid])

  return (
    <div>
      <div className='grid grid-cols-2'>
        <SingleJobComponent data={singleJobData}/>
        {/* Related jobs */}
        
        <div>
            {/* <h1 className='px-5 font-semibold pb-4 text-2xl'>{singleJobData[0].jobRole} Related Jobs </h1> */}
        <div className='grid grid-cols-2 px-5'>
            
            {relatedData.map((item)=>{
                return(
                   <JobCard jdUid={item.jdUid}
                   jobRole={item.jobRole}
                   jobLocation={item.location}
                   jobDesc={item.jobDetailsFromCompany}
                   jobImg={item.logoUrl}
                   jobCurrency={item.salaryCurrencyCode}
                   jobminExp={item.minExp}
                   jobmaxExp={item.maxExp}   />
                )
            })}
        </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
