import React from 'react';
import './SignUpPopover.css';

import {connect} from 'react-redux';

import {createUser} from './../../ducks/reducer.js';

class SignUpPopover extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      usernameInput: '',
      emailInput:'',
      passwordInput:'',
      confirmPasswordInput:'',

    }
  }

  comparePasswords = () => {
    if(this.state.passwordInput === this.state.confirmPasswordInput){
      return true;
    } else {
      return false;
    }
  }

  createUser = () => {
    if( !this.comparePasswords() ){
      window.alert('Passwords do not match.')
    } else if (this.state.usernameInput === '' || this.state.emailInput === '' || this.state.passwordInput === ''){
      window.alert('Please make sure the sign-up form is complete with valid entries.')
    } else {
      this.props.closeSignUpPopover();
      this.props.createUser({email:this.state.emailInput, username:this.state.usernameInput, password:this.state.passwordInput})
    }
  }


  render(){

    let props = this.props;
    return (
      <div className='login-popover_wrapper' onClick={() => props.closeSignUpPopover()}>
        <div onClick={(e) => e.stopPropagation()} id="login-popover_content-wrapper">
          <div id="login-popover_x-out" onClick={() => props.closeSignUpPopover()}>x</div>
          <h2 id="login-popover_header">Get Started! It's Easy!</h2>
          <form>
            <div style={{display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
              {/* <label style={{margin:'5px'}} for="exampleInputEmail1">Username:</label> */}
              <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text text-muted">Choose a username.</small>
              <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({usernameInput:e.target.value})} className="form-control" placeholder="Username" />
            </div>
            <div style={{display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
              {/* <label style={{margin:'5px'}} for="exampleInputEmail1">E-mail address:</label> */}
              <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text text-muted">We'll never share your email.</small>
              <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({emailInput:e.target.value})} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter E-mail" />
            </div>
            <div style={{display:'block', width:'90%',  margin:' 15px auto'}} className="form-group">
              {/* <label style={{margin:'5px'}} for="exampleInputPassword1">Password:</label> */}
              <small style={{fontSize:'12px', margin:'-5px auto 5px 5px', color:'#e03333'}} id="emailHelp" className="form-text">It's best practice to not use your IG password here.</small>
              <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({passwordInput:e.target.value})} type="password" className="form-control" placeholder="Choose Password" />
              <input style={{marginTop:'3px', padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({confirmPasswordInput:e.target.value})} type="password" className="form-control" placeholder="Re-Enter Password" />
            </div>
            <button 
              style={{margin:'0 auto -7px auto', display:'block', width:'90%', fontWeight:'bold', padding:'12px'}} 
              type="submit" 
              className="btn login-popover_log-in-button"
              onClick={(e) => {
                e.stopPropagation(); 
                this.createUser();
              }}
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
}

function mapStateToProps(state){
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps, {
  createUser,
})(SignUpPopover);