import React from 'react';

const Navigation= ({onRouteChange,isSignedIn}) => {
  	if (isSignedIn) {
  		return (
		     <nav style={{display:'flex',justifyContent:'flex-end', paddingRight:'1rem'}}>
		    	<p onClick={() => onRouteChange('signout')} 
		    	className= 'gray f3 link underline p3 pointer pa2 hover-moon-gray' > Sign out </p>
		    </nav>
  	)}	 
  	else {
  		return (
    <nav style={{display:'flex',justifyContent:'flex-end', paddingRight:'2rem'}}>
    	<p onClick={() => onRouteChange('SignIn')} 
    	className= 'gray f3 link underline p3 pointer pa2 hover-moon-gray' > Sign in </p>
    	<p onClick={() => onRouteChange('Register')} 
    	className= 'gray f3 link dim black underline p3 pointer pa2 hover-moon-gray' > Register </p>
    </nav>
  	)} 
}

export default Navigation;