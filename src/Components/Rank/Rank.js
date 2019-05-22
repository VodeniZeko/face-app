import React from 'react';

const Rank = ({name,entries}) => {
  return (
    <div>
    	<div className = 'white f2'>
    	{`${name}, you provided`} <span className="bg-light-red">{`${entries}`}</span> {`links total..`} 
    	</div>

    </div>
  )
}

export default Rank;