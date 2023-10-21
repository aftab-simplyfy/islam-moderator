import React from 'react'

function AlertComp(props) {
  return (
    <div className="toast active">
    <div className="toast-content">
        <i className="fas fa-solid fa-check check" />
        <div className="message">
        <span className="text text-1">Success</span>
        <span className="text text-2"></span>
        </div>
    </div>
    <i className="fa-solid fa-xmark close" />
    {/* Remove 'active' class, this is just to show in Codepen thumbnail */}
    <div className="progress active" />
    </div>

  )
}

export default AlertComp