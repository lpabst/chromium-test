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
        <label style={{margin:'15px', display:'block'}} for="exampleInputEmail1">Your Dashboard</label>
        <label style={{margin:'15px', display:'block'}} for="exampleInputEmail1">Your Profile</label>
        <label style={{margin:'15px', display:'block'}} for="exampleInputEmail1">Your Payment Method</label>
        <label style={{margin:'15px', display:'block'}} for="exampleInputEmail1">Help & Feedback</label>
          <button 
            style={{margin:'30px auto 20px auto', display:'block', background:'#ef992f', width:'90%', fontWeight:'bold', padding:'12px'}} 
            type="submit" 
            className="btn"
            onClick={(e) => {e.stopPropagation()}}
          >
            Log Out
          </button>
      </div>
    </div>
  )
}