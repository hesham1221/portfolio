import React from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import '../styles/arrows.css'
const ArrowDown = ({href}) => {
  return (
    <div  className='arrow-container'>
        <a href={href} className="arrows">
            <IoIosArrowDown  className='arrow-down'/>
        <IoIosArrowDown className='arrow-down'/>
            </a>
    </div>
  )
}

export default ArrowDown