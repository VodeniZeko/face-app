import React from 'react';
import Tilt from 'react-tilt';
import face2 from './face2.jpg';
import './Logo.css';

const Logo = () => {
  return (
    <div className = 'ma5 mt5'>
    <Tilt className="Tilt br2 shadow-2 db " options={{ max : 35 }} style={{ height: 120, width: 180 }} >
 <div className="Tilt-inner"> <img className=' w-100 o-70' alt='logo'src={face2}/> </div>
</Tilt>
    </div>
  )
}

export default Logo;