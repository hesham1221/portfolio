import React, { useState } from 'react'
import '../styles/admin.scss'
import Navbar from '../components/Navbar'
const Admin = () => {
    const [userName , setUserName ] = useState('')
    const [userPassword , setUserPassword ] = useState('')
   const submitHandler = async(e) =>{
    e.preventDefault()
   try{

       const res = await fetch('https://localhost:5000/login',{
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
    }catch(e){
        console.log(e)
    }
    }
  return (
      <>
      <Navbar />
        <div className='admin'>
        <div className="adminFormContainer">
            <form onSubmit={submitHandler} className="adminForm">
                <h1 className="adminHeader">H-Admin Panel</h1>
                <h2 className="adminText">UserName :</h2>
                <input onChange={(ch) => setUserName(ch.target.value)} type="text" className="adminInput" />
                <h2 className="adminText">Password :</h2>
                <input onChange={(ch) => setUserPassword(ch.target.value)} type="password" className="adminInput" />
                <button className='adminSubmit'>Login</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Admin