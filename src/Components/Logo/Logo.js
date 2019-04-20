import React from 'react';
import Tilt from 'react-tilt';
import logoImg from './logoImg.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className = 'ma4 mt0'>
    <Tilt className="Tilt br2 shadow-2 db " options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner"> <img className='w-100 o-60' alt='logo'src={logoImg}/> </div>
</Tilt>
    </div>
  )
}

export default Logo;