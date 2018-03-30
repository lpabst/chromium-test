import React from 'react';
import './LogoutPopover.css';

function formatUsername(name){
  name = name.length < 20 ? name : name.split('').slice(0, 18).join('') + '...';
  return name;
}

export default function LogoutPopover(props) {

  return (
    <div className='login-popover_wrapper' onClick={() => props.closeLogoutPopover()}>
      <div onClick={(e) => e.stopPropagation()} id="login-popover_content-wrapper">
        <div id="login-popover_x-out" onClick={() => props.closeLogoutPopover()}>x</div>
        <h2 style={{marginBottom:'25px'}} id="login-popover_header">Hello, {formatUsername(props.username)}</h2>
        <label className="logout-popover_nav-button" style={{margin:'15px', display:'block'}} >Go To Dashboard</label>
        <label className="logout-popover_nav-button" style={{margin:'15px', display:'block'}} >Update Profile</label>
        <label className="logout-popover_nav-button" style={{margin:'15px', display:'block'}} >Update Payment Method</label>
        <label className="logout-popover_nav-button" style={{margin:'15px', display:'block'}} >Help & Feedback</label>
          <button 
            style={{margin:'30px auto 20px auto', display:'block', width:'90%', fontWeight:'bold', padding:'12px'}} 
            type="submit" 
            className="btn login-popover_log-in-button"
            onClick={
              (e) => {
                e.stopPropagation();
                props.logOut();
                props.closeLogoutPopover();
              }
            }
          >
            Log Out
          </button>
      </div>
    </div>
  )
}