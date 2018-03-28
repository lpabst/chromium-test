import React from 'react';
import './LogoutPopover.css';

export default function LogoutPopover(props) {

  return (
    <div className='logout-popover_wrapper' onClick={() => props.closeLogoutPopover()}>
      <h1>Logout</h1>
    </div>
  )
}