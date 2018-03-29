import React from 'react';
import './SignUpPopover.css';

export default function SignUpPopover(props) {

  return (
    <div className='login-popover_wrapper' onClick={() => props.closeSignUpPopover()}>
      <div onClick={(e) => e.stopPropagation()} id="login-popover_content-wrapper">
        <div id="login-popover_x-out" onClick={() => props.closeSignUpPopover()}>x</div>
        <h2 id="login-popover_header">Get Started! It's Easy!</h2>
        <form>
          <div style={{display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
            {/* <label style={{margin:'5px'}} for="exampleInputEmail1">Username:</label> */}
            <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text text-muted">Choose a username.</small>
            <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" />
          </div>
          <div style={{margin:'0 auto', display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
            {/* <label style={{margin:'5px'}} for="exampleInputEmail1">E-mail address:</label> */}
            <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text text-muted">We'll never share your email.</small>
            <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter E-mail" />
          </div>
          <div style={{margin:'0 auto', display:'block', width:'90%',  margin:' 15px auto'}} className="form-group">
            {/* <label style={{margin:'5px'}} for="exampleInputPassword1">Password:</label> */}
            <small style={{fontSize:'12px', margin:'-5px auto 5px 5px', color:'#e03333'}} id="emailHelp" className="form-text">It's best practice to not use your IG password here.</small>
            <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Choose Password" />
            <input style={{marginTop:'3px', padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Re-Enter Password" />
          </div>
          <button 
            style={{margin:'0 auto -7px auto', display:'block', width:'90%', fontWeight:'bold', padding:'12px'}} 
            type="submit" 
            className="btn login-popover_log-in-button"
            onClick={(e) => {e.stopPropagation()}}
          >
            Sign Up
          </button>
          <p style={{textAlign:'center', padding:'30px', color:'#777', fontWeight:'bold'}}>_____________ or _____________</p>
          <button 
            style={{margin:'0 auto 20px auto', display:'block', width:'90%', fontWeight:'bold', padding:'12px'}} 
            className="btn login-popover_log-in-button"
            onClick={(e) => {e.stopPropagation(); props.openLoginPopover();}}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}