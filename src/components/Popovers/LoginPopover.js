import React from 'react';
import './LoginPopover.css';

export default function LoginPopover(props) {

  return (
    <div className='login-popover_wrapper' onClick={() => props.closeLoginPopover()}>
      <div onClick={(e) => e.stopPropagation()} id="login-popover_content-wrapper">

      </div>
    </div>
  )
}