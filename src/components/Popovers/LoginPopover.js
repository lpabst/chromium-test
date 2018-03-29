import React from 'react';
import './LoginPopover.css';

export default function LoginPopover(props) {

  return (
    <div className='login-popover_wrapper' onClick={() => props.closeLoginPopover()}>
      <div onClick={(e) => e.stopPropagation()} id="login-popover_content-wrapper">
        <div id="login-popover_x-out" onClick={() => props.closeLoginPopover()}>x</div>
        <h2 id="login-popover_header">Log In to Your Account!</h2>
        <form>
          <div style={{margin:'0 auto', display:'block', width:'90%', margin:' 10px auto 10px auto'}} className="form-group">
            <label style={{margin:'5px'}} for="exampleInputEmail1">E-mail address:</label>
            <input style={{padding:'6px', fontSize:'20px'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter E-mail" />
            <small style={{fontSize:'13px', textAlign:'center'}} id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div style={{margin:'0 auto', display:'block', width:'90%',  margin:' 10px auto 10px auto'}} className="form-group">
            <label style={{margin:'5px'}} for="exampleInputPassword1">Password:</label>
            <input style={{padding:'6px', fontSize:'20px'}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
          </div>
          <button 
            style={{margin:'0 auto', display:'block', background:'#ef992f', width:'90%', fontWeight:'bold', padding:'12px'}} 
            type="submit" 
            className="btn"
          >
            Log In
          </button>
          <p style={{textAlign:'center', padding:'30px', color:'#777', fontWeight:'bold'}}>_____________ or _____________</p>
          <button 
            style={{margin:'0 auto', display:'block', background:'#ef992f', width:'90%', fontWeight:'bold', padding:'12px'}} 
            className="btn"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}