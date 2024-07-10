import React, { useEffect, useState } from 'react'
import Main from '../components/Main.js'
import JobCard from '../components/JobCard.js'

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearchTerm = (e) => {
    const searchjob = e.target.value;
    setSearchTerm(searchjob);
    console.log(searchTerm);
    fetch(`http://localhost:8000/jobs?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log("Error in Searching", error));
  }

  const fetchPost = async () => {
    fetch(`http://localhost:8000/jobs?`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(prevData => [...prevData, ...data]);
        setHasMore(data.length > 0);
        setIsLoading(false);
      })
      .catch(error => console.log("Error in fetching posts", error));
  }

  useEffect(() => {
    fetchPost();
  }, [page]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore && !isLoading) {
  //       setPage(prevPage => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [hasMore, isLoading]);

  console.log(data);
  return (
    <>
      <div className=''>
        <h1 className='text-3xl font-semibold text-gray-800'>Find your Dream job with Ease</h1>
        <h1 className='text-md font-md text-gray-800'>Apply now to Get your first job within a matter of Days</h1>
        {/*  */}
        <div className='mt-8 px-4 py-7 shadow-sm'>
          <input placeholder='Search Job' className='w-[40%] p-2 border outline-none' value={searchTerm} onChange={(e) => handleSearchTerm(e)} />
        </div>
      </div>
      <div className='flex flex-wrap md:grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
        
        {isLoading && data.length === 0 ? [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div key={index} className='bg-gray-200 shadow-sm animate-pulse h-[270px]'></div>
        )) : data.map((item, index) => {
          return (
            <JobCard key={index}
            data={item}
              jdUid={item.jdUid}
              jobRole={item.jobRole}
              jobLocation={item.location}
              jobDesc={item.jobDetailsFromCompany}
              jobImg={item.logoUrl}
              jobCurrency={item.salaryCurrencyCode}
              jobminExp={item.minExp}
              jobmaxExp={item.maxExp}
              jdLink={item.jdLink}
              // maxJdSalary, minJdSalary,companyName,id
            />
          )
        })}
      </div>
      {isLoading && <div className="text-center mt-4">Loading more jobs...</div>}
    </>
  )
}

export default HomePage
