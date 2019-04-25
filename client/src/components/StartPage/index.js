import React from 'react';
import {Link} from 'react-router-dom'
import './StartPage.scss'

export default ()=>{
  return (
    <div className="StartPage">
      <div className="logo"></div>
      <Link to='/settings'>
        <button className="btn btn-open_settings">Open Settings</button>
      </Link>
    </div>
  )
}