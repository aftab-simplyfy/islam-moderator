import React from 'react'
import { Link } from 'react-router-dom'


function BottomBar(props) {
  return (
    <div className="navbar col-lg-12 navbar-brand-wrapper col-12 p-0 fixed-bottom  m-auto ">
    <div className="text-center navbar-brand-wrapper w-100 align-items-center justify-content-center">
    <div id='save-btn' className='my-2 justify-content-center'>
              <button  className='btn btn-primary px-5 btn-icon-text' onClick={props.savePostData}>Save Changes</button>
         </div>
    </div>
   
  </div>
  )
}

export default BottomBar