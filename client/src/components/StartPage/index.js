import React from 'react';
import {Link} from 'react-router-dom'

export default ()=>{
  return (
    <div className="StartPage">
      <Link to='/settings'>
        <button className="btn">Open Settings</button>
      </Link>
    </div>
  )
}