import React from 'react'
import { useNavigate } from 'react-router'
import '../styles/navbar.scss'
const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className="navbar">
        <div onClick={() => navigate('../' , {replace : true})} className="logo">
            H-Portofolio
        </div>
        <div className="options">
            <ul className="options_list">
                <li className="options_links" onClick={() => navigate('../' , {replace : true})}><div>Home</div></li>
                <li className="options_links" onClick={() => navigate('../work')}><div>Work</div></li>
                <li className="options_links" onClick={() => navigate('../contact')}><div>Contact</div></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar