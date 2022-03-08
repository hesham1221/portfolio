import React from 'react'
import Header from './Header'
import '../styles/hero.css'
import HeroBody from './HeroBody'
import ArrowDown from './ArrowDown'
const Hero = () => {
  return (
    <div className='hero'>
    <Header />
    <HeroBody />
    <ArrowDown href='#whyme'/>
    </div>
  )
}

export default Hero