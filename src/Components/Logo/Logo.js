import React from 'react';
import Tilt from 'react-tilt';
import face2 from './face2.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className = 'ma5 mt5 bg-transparent'>
    <Tilt className="Tilt " options={{ max : 35 }} style={{ height: 150, width: 250 }} >
 <div className="Tilt-inner "> <img className=' w-100 o-80' alt='logo'src={face2}/> </div>
</Tilt>
    </div>
  )
}

export default Logo;