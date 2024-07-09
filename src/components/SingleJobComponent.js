import React from 'react'

const SingleJobComponent = ({ data }) => {

    const dummyData = [
        { "name": "Salary", "value": "120K", color: 'blue-300' },
        { "name": "Job Type", "value": "Full Time", color: 'green-300' },
        { "name": "Vacancisy", "value": "40", color: 'pink-300' },
        { "name": "Applicaanrs", "value": "150", color: 'red-300' },
    ];

    const ListOfSkills = [
        { skill: "React-native" },
        { skill: "React js" },
        { skill: "API " },
        { skill: "C++" },
        { skill: "Data Structures" },
        { skill: "Vue js" },
        { skill: "UI Ux Design" },
        { skill: "Figma" },
        { skill: "Debugging" },

    ];
    return (
        <div>
            {
                data.map((item) => (
                    <div className='border p-6 rounded-xl shadow-sm space-y-5'>

                        <div className='flex gap-4'>
                            <img src={item.logoUrl} alt='company logo' className='h-[100px]' />
                            <div>
                                <h1 className='text-xl font-semibold '>{item.jobRole}</h1>
                                <h1 className='text-md font-[400]'>{item.location}</h1>
                                <h1>a few Seconds ago</h1>
                            </div>
                        </div>

                        <div>
                            <ul className='flex justify-between items-center gap-4 '>
                                {
                                    dummyData?.map((item, index) => {
                                        return (
                                            <li key={index} className={`p-2 font-semibold text-gray-800 border-2 border-white w-[100%] text-center bg-${item.color} rounded-md `}>
                                                <h1>{item.name}</h1>
                                                <h1>{item.value}</h1>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <ul className='flex flex-wrap gap-4'>
                                {ListOfSkills?.map((item, index) => (<li className='px-2 py-1 border rounded-md font-semibold text-sm font-md  bg-red-400  '>{item.skill}</li>))}
                            </ul>
                        </div>
                        {/* Two buttons */}
                        <div className='flex justify-between items-center gap-2'>
                            <button className='px-2 py-3 border font-semibold border-white  rounded-3xl border bg-gray-800 text-white w-[50%]'>Job Dewcription</button>
                            <button className='px-2 py-3 border font-semibold border-gray-800 rounded-3xl border bg-white-800 text-gray-800 w-[50%]'>Company</button>
                        </div>
                        <div className='space-y-1 '>
                            <h1 className='text-xl font-semibold'>Job Description</h1>
                            <p className='font-[400]'>{item.jobDetailsFromCompany}</p>
                        </div>
                        <div></div>
                    </div>
                ))
            }
        </div>
    )
}

export default SingleJobComponent
