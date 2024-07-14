import React from 'react'
import PublicProfile from './PublicProfile'
import AdvertisementBlock from '../components/AdvertisementBlock'

const Profile = () => {
  return (
    <div className=' md:grid grid-cols-3 py-5 gap-5'>
        <div  className='col-span-2'>
          <PublicProfile/>
        </div>
        {/* NewsLetter  */}
        <div>
          <AdvertisementBlock/>
        </div>
    </div>
  )
}

export default Profile
