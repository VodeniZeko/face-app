import React from 'react';
import './ImageLink.css';

const ImageLink = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
    	<p className = 'f3'>
    	{'magic link that detects face, try it out .'}
    	</p>
	    	<div className = 'center w-100'>
    	<div className = 'form center pa3 br3 shadow-5 '>
	    		<input 
          className = 'f4 w-70 center ' 
          type ='text' 
          onChange={onInputChange} 
          />
	    		<button 
          className ='w-30 grow f4 link ph1 pv2 dib bg-light-gray'
          onClick = {onButtonSubmit}
          > Detect </button>
	    	</div>
    	</div>
    </div>
  )
}

export default ImageLink;