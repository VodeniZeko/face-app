import React from 'react';

const Navigation= ({onRouteChange}) => {
  return (
    <nav style={{display:'flex',justifyContent:'flex-end', paddingRight:'1rem'}}>
    	<p onClick={() => onRouteChange('SignIn')} 
    	className= 'gray f3 link dim black underline p3 pointer' > Sign out </p>
    </nav>
  )
}

export default Navigation;