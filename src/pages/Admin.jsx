import React, { useState } from 'react'
import '../styles/admin.scss'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router";
const Admin = ({isAdmin , setIsAdmin}) => {
    const [notAdmin,setNotAdmin] = useState(false)
    const [userName , setUserName ] = useState('')
    const [userPassword , setUserPassword ] = useState('')
    const navigate = useNavigate()
   const submitHandler = async(e) =>{
    e.preventDefault()
   try{

       const res = await fetch('https://hportofolio.herokuapp.com/login',{
        method : 'POST',
        headers :{
            "Content-type": "application/json; charset=UTF-8"
        },
        body : JSON.stringify({
            username : userName,
            password : userPassword
        })
    })
    const data = await res.json()
    console.log(data)
    if (data.message === 'welcome back hesham'){
        setIsAdmin(true)
        navigate('../work',{replace : true})
        localStorage.setItem('HPortofolio-admin','admin')
    }else{
        setNotAdmin(true)
    }
    
    }catch(e){
        setNotAdmin(true)
        console.log(e)
    }
    }
  return (
      <>
      <Navbar />
        <div className='admin'>
            {notAdmin&&<h3 style={{color : 'red'}} className="err">Error</h3>}
        <div className="adminFormContainer">
            <form onSubmit={submitHandler} className="adminForm">
                <h1 className="adminHeader">H-Admin Panel</h1>
                <h2 className="adminText">UserName :</h2>
                <input onChange={(ch) => setUserName(ch.target.value)} type="text" className={`adminInput ${notAdmin && 'notAdmin'}`} />
                <h2 className="adminText">Password :</h2>
                <input onChange={(ch) => setUserPassword(ch.target.value)} type="password" className={`adminInput ${notAdmin && 'notAdmin'}`} />
                <button className='adminSubmit'>Login</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Admin