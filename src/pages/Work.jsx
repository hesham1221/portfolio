import React, { useEffect, useState } from 'react'
import AWork from '../components/AWork'
import Navbar from '../components/Navbar'
import '../styles/work.scss'
const Work = ({isAdmin,setIsAdmin}) => {
  const [work , setWork] = useState([])
  const server = 'http://localhost:5000/'
  useEffect(() => {
    const getWork = async () =>{
      try {
        const fetchedData = await fetch(`${server}allwork`)
        const data = await fetchedData.json()
        setWork(data)
      } catch (err) {
        console.log(err)
      }
    }
    getWork()
  },[])
  return (
    <div className='work'>
        <Navbar workSelected={true} setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
        <div className="work_body">
          {work.map(awork => <AWork setWork={setWork} isAdmin = {isAdmin} work={awork} />)}
        </div>
    </div>
  )
}

export default Work