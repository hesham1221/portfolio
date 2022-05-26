import React from 'react'
import Navbar from '../components/Navbar'

const Work = ({isAdmin,setIsAdmin}) => {
  return (
    <div className='work'>
        <Navbar workSelected={true} setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
    </div>
  )
}

export default Work