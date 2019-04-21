import React from 'react';
import Tilt from 'react-tilt';
import emoji from './emoji.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className = 'ma4 mt0'>
    <Tilt className="Tilt br2 shadow-2 db " options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner"> <img className='w-100 o-60' alt='logo'src={emoji}/> </div>
</Tilt>
    </div>
  )
}

export default Logo;