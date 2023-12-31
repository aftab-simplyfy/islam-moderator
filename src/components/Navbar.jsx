import React from 'react'
import { Link } from 'react-router-dom'
import profile from './images/profile.jpg'
import { auth } from '../firebase-auth'
function Navbar(props) {
  return (
    <>
  {/* partial:partials/_navbar.html */}
  <nav className="navbar col-lg-12 col-12 p-0 fixed-top  d-flex flex-row">
    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
      <Link className="navbar-brand d-block brand-logo mr-5" to="/">
        {/* <img src="images/logo.svg" className="mr-2" alt="logo" /> */}
        <p className='h5 ml-5'>Islam-iQ Post Moderator</p>
      </Link>

    </div>
    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

      <ul className="navbar-nav navbar-nav-right">
        {/* <li>
        <div id='save-btn' className='d-flex my-2 justify-content-center'>
              <button  className='btn btn-primary btn-icon-text'>Save</button>
         </div>
        </li> */}
        <li className="nav-item dropdown">
          <a
            className="nav-link count-indicator dropdown-toggle"
            id="notificationDropdown"
            href="#"
            data-toggle="dropdown"
          >
            <i className="icon-bell mx-0" />
            <span className="count" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
            aria-labelledby="notificationDropdown"
          >
            <p className="mb-0 font-weight-normal float-left dropdown-header">
              Notifications
            </p>
            <a className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-success">
                  <i className="ti-info-alt mx-0" />
                </div>
              </div>
              <div className="preview-item-content">
                <h6 className="preview-subject font-weight-normal">
                  Application Error
                </h6>
                <p className="font-weight-light small-text mb-0 text-muted">
                  Just now
                </p>
              </div>
            </a>
            <a className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-warning">
                  <i className="ti-settings mx-0" />
                </div>
              </div>
              <div className="preview-item-content">
                <h6 className="preview-subject font-weight-normal">Settings</h6>
                <p className="font-weight-light small-text mb-0 text-muted">
                  Private message
                </p>
              </div>
            </a>
            <a className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-info">
                  <i className="ti-user mx-0" />
                </div>
              </div>
              <div className="preview-item-content">
                <h6 className="preview-subject font-weight-normal">
                  New user registration
                </h6>
                <p className="font-weight-light small-text mb-0 text-muted">
                  2 days ago
                </p>
              </div>
            </a>
          </div>
        </li>
        <li className="nav-item nav-profile dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            id="profileDropdown"
          >
            <img src={profile} alt="profile" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="profileDropdown"
          >
            {/* <a className="dropdown-item">
              <i className="ti-settings text-primary" />
              Settings
            </a> */}
            <button className="dropdown-item" onClick={()=>{auth.signOut()}}>
              <i className="ti-power-off text-primary" />
              Logout
            </button>
          </div>
        </li>
      </ul>
      <button
        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button"
        data-toggle="offcanvas"
      >
        <span className="icon-menu" />
      </button>
    </div>
  </nav>
</>

  )
}

export default Navbar