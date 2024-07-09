import axios from 'axios';
import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import MessageModal from './MessageModal';
const UploadJobForm = ({ closeModal }) => {

    const [companyName, setCompanyName] = useState('');
    const [logoUrl, setlogoUrl] = useState('');
    const [jobRole, setjobRole] = useState('');
    const [location, setlocation] = useState('');
    const [minExp, setminExp] = useState('');
    const [maxExp, setmaxExp] = useState('');
    const [jobDetailsFromCompany, setjobDetailsFromCompany] = useState('');
    const [minJdSalary, setminJdSalary] = useState('');
    const [maxJdSalary, setmaxJdSalary] = useState('');
    const [jdLink, setjdLink] = useState(null);
    const [messageModal, setMessageModal] = useState(false);
    const [error, setError] = useState(false);

    const handleResetState = (e) => {
        e.preventDefault();
        setCompanyName("");
        setjobRole("");
        setlogoUrl("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jdUid = uuidV4();
        if (!companyName || !logoUrl || !jobRole || !location || !minExp || !maxExp || !jobDetailsFromCompany || !minJdSalary || !maxJdSalary) {
            setError(true);
            return;
        };
        const formData = {
            jdUid: jdUid,
            jdLink: jdLink,
            companyName: companyName,
            logoUrl: logoUrl,
            jobRole: jobRole,
            location: location,
            minExp: minExp,
            maxExp: maxExp,
            jobDetailsFromCompany: jobDetailsFromCompany,
            minJdSalary: minJdSalary, maxJdSalary: maxJdSalary,
        };
        try {
            const response = await axios.post('http://localhost:8000/jobs', formData);
            console.log(response.data);
            setMessageModal(true);
            closeModal();

        } catch (error) {
            console.error('There was an error posting the data!', error);
            setMessageModal(true);

        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='space-y-1 scroll-y h-[80vh] '>
                    <h1 className='font-semibold text-xl mb-5'>Upload A Job </h1>
                    <div className='mb-2'>
                        {/* {error&&error==true?(<h1 className='text-red-400 font-md text-sm'>Provide all the required Field</h1>):("")} */}
                        <input placeholder=' Name' className='w-[100%] p-2 outline-none border rounded-sm ' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <h6 className='text-sm font-md pl-1'>Company Logo</h6>
                        <input placeholder='Logo' type='hyperlink' className='w-[100%] p-2 outline-none border rounded-sm ' value={logoUrl} onChange={(e) => setlogoUrl(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <h6 className='text-sm font-md pl-1'>External Link</h6>
                        <input placeholder='External Link' type='hyperlink' className='w-[100%] p-2 outline-none border rounded-sm ' value={jdLink} onChange={(e) => setjdLink(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <h6 className='text-sm font-md pl-1'>Job Role</h6>
                        <input placeholder='Job Role' className='w-[100%] p-2 outline-none border rounded-sm ' value={jobRole} onChange={(e) => setjobRole(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <h6 className='text-sm font-md pl-1'>Location</h6>
                        <input placeholder='Job Location' className='w-[100%] p-2 outline-none border rounded-sm ' value={location} onChange={(e) => setlocation(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-2  gap-5'>
                        <div className='mb-2'>
                            <h6 className='text-sm font-md pl-1'>Minimum Experience</h6>
                            <input placeholder='Minimum Experience' type='number' className='w-[100%] p-2 outline-none border rounded-sm ' value={minExp} onChange={(e) => setminExp(e.target.value)} />
                        </div>
                        <div className='mb-2'>
                            <h6 className='text-sm font-md pl-1'>Maximum Experience</h6>
                            <input placeholder='MAximum Experience' type='number' className='w-[100%] p-2 outline-none border rounded-sm ' value={maxExp} onChange={(e) => setmaxExp(e.target.value)} />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <h6 className='text-sm font-md pl-1'>Job Description</h6>
                        <textarea rows={3} placeholder='Job Description' className='w-[100%] p-2 outline-none border rounded-sm ' value={jobDetailsFromCompany} onChange={(e) => setjobDetailsFromCompany(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-2  gap-5'>
                        <div className='mb-2'>
                            <h6 className='text-sm font-md pl-1'>Minimum CTC</h6>
                            <input placeholder='Minimum CTC' type='number' className='w-[100%] p-2 outline-none border rounded-sm ' value={minJdSalary} onChange={(e) => setminJdSalary(e.target.value)} />
                        </div>
                        <div className='mb-2'>
                            <h6 className='text-sm font-md pl-1'>Maximum CTC</h6>
                            <input placeholder='Maximum CTC' type='number' className='w-[100%] p-2 outline-none border rounded-sm ' value={maxJdSalary} onChange={(e) => setmaxJdSalary(e.target.value)} />
                        </div>
                    </div>
                    <div className='space-x-2'>
                        <button className='py-2 px-4 border bg-gray-900 text-white hover:bg-white hover:text-gray-900' type='submit'>Submit</button>
                        <button className='py-2 px-4  border bg-green-500 text-white hover:bg-white hover:text-green-500'  >Reset</button>
                    </div>
                </div>
            </form>
            <div>
                {messageModal && messageModal == true ? (<MessageModal message={"yes"} />) : ("")}
            </div>
        </>
    )
}

export default UploadJobForm
