import React from 'react'
import { useNavigate } from 'react-router'
import '../styles/navbar.scss'
const Navbar = ({isAdmin,setIsAdmin,homeSelected,uploadSelected,workSelected}) => {
    const navigate = useNavigate()
  return (
    <div className="navbar">
        <div onClick={() => navigate('../' , {replace : true})} className="logo">
            H-Portofolio
        </div>
        <div className="options">
            <ul className="options_list">
                <li className={`options_links ${homeSelected && 'selected'}`} onClick={() => navigate('../' , {replace : true})}><div>Home</div></li>
                <li className={`options_links ${workSelected && 'selected'}`} onClick={() => navigate('../work')}><div>Work</div></li>
                {isAdmin &&<li className={`options_links ${uploadSelected && 'selected'}`} onClick={() => navigate('../uploadwork')}><div>upload work</div></li>}
                {isAdmin &&<li className={`options_links`} onClick={() => {localStorage.removeItem('HPortofolio-admin') ;setIsAdmin(false); navigate('../')}}><div>logout</div></li>}
                <li className={`options_links`} onClick={() => navigate('../contact')}><div>Contact</div></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar