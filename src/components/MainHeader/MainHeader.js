import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {isLoggedIn, logOut} from './../../ducks/reducer.js';

import LoginPopover from './../Popovers/LoginPopover.js';
import LogoutPopover from './../Popovers/LogoutPopover.js';
import SignUpPopover from './../Popovers/SignUpPopover.js';
import LoadingPopover from './../Popovers/LoadingPopover.js';

import './MainHeader.css';

class MainHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navActive: [
        'active',
        '',
        '',
        '',
        '',
        '',
      ],
      showLoginPopover: false,
      showLogoutPopover:false,
      showSignUpPopover:false,
    }

  }

  componentWillMount(){
    this.props.isLoggedIn()
  }
  
  componentDidMount(){
    this.lookAtURLForNavStyle()
  }

  updateActiveTabStyle = (tagIndex) => {
    let navActive = [...this.state.navActive];
    for(let i=0;i<navActive.length;i++){
      navActive[i] = '';
    };
    navActive[tagIndex] = 'active';
    this.setState({
      navActive
    });
  };

  lookAtURLForNavStyle = () => {
    if(window.location.href.split('#/')[1]){
      if(window.location.href.split('#/')[1].includes("discover")) {this.updateActiveTabStyle(1)} return;
      if(window.location.href.split('#/')[1].includes("faq")) {this.updateActiveTabStyle(2)} return;
      if(window.location.href.split('#/')[1].includes("support")) {this.updateActiveTabStyle(3)} return;
      if(window.location.href.split('#/')[1].includes("about")) {this.updateActiveTabStyle(4)} return;
      if(window.location.href.split('#/')[1].includes("dashboard")) {this.updateActiveTabStyle(5)} return;
    }
  }

  openLoginPopover = () => {
    if(!this.state.showLoginPopover){
      this.setState({showLoginPopover: true, showLogoutPopover:false, showSignUpPopover:false})
    }
  }
  closeLoginPopover = () => {
    this.setState({showLoginPopover: false})
  }
  openLogoutPopover = () => {
    if(!this.state.showLogoutPopover){
      this.setState({showLogoutPopover: true})
    }
  }
  closeLogoutPopover = () => {
    this.setState({showLogoutPopover: false})
  }
  openSignUpPopover = () => {
    if(!this.state.showSignUpPopover){
      this.setState({showSignUpPopover: true, showLoginPopover: false, showLogoutPopover:false})
    }
  }
  closeSignUpPopover = () => {
    this.setState({showSignUpPopover: false})
  }

  
  showUsernameOrLogin = () => {
    let username = this.props.loggedIn ? this.props.username :  "Log In/Join"
    if(username.length > 20){
      username = username.split('').slice(0, 18).join('') + '...';
    }
    return (
      <h1 
        style={{paddingRight:'20px', fontSize:'18px'}}
        onClick={ this.props.loggedIn ? () => this.openLogoutPopover() : () => this.openLoginPopover()}
        ref={(u) => { this.headerLoginButton = u }}
        className="main-header_login-username"
      >
        {String.fromCharCode(9663)}
        &nbsp;
        &nbsp;        
        {username}
      </h1>
    )
  }

  render() {
    // console.log(this)
    return (
      <div className="mainHeader_wrapper">
        <nav className="navbar navbar-expand-lg navbar-light" style={{maxWidth:'1320px', margin:'0 auto'}}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand main-header_logo" href="#"></a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav nav nav-tabs mr-auto mt-2 mt-lg-0">
              <li className={`nav-item ${this.state.navActive[0]}`}>
                <Link to="/" style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className={`nav-item ${this.state.navActive[1]}`}>
                <Link to="/discover" style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast">Discover</Link>
              </li>
              <li className={`nav-item ${this.state.navActive[2]}`}>
                <a style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast">FAQ</a>
              </li>
              <li className={`nav-item ${this.state.navActive[3]}`}>
                <a style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast">Support</a>
              </li>
              <li className={`nav-item ${this.state.navActive[4]}`}>
                <a style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast">About Us</a>
              </li>
              { this.props.loggedIn &&
                <li className={`nav-item ${this.state.navActive[5]}`}>
                  <a style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast">Dashboard</a>
                </li>
              }
            </ul>
            {this.showUsernameOrLogin()}
            <div style={{ width:'2px', height:'45px', background:'#666'}}></div>
            <form className="form-inline my-2 my-lg-0" style={{paddingRight:'10px', paddingLeft:'20px'}}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{height:'25px'}}/>
              <button className="btn btn-outline-info my-2 my-sm-0" type="submit" style={{ padding:'0px 10px'}}>Search</button>
            </form>
          </div>
        </nav>
        { this.state.showLoginPopover && 
          < LoginPopover openSignUpPopover={this.openSignUpPopover} closeLoginPopover={this.closeLoginPopover} />
        }
        { this.state.showLogoutPopover && 
          < LogoutPopover logOut={this.props.logOut} username={this.props.username} closeLogoutPopover={this.closeLogoutPopover} />
        }
        { this.state.showSignUpPopover && 
          < SignUpPopover openLoginPopover={this.openLoginPopover} closeSignUpPopover={this.closeSignUpPopover} />
        }
        { this.props.loading && 
          < LoadingPopover />
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      loading: state.loading,
      loggedIn: state.loggedIn,
      username: state.username,
  }
}

export default connect(mapStateToProps, {
  isLoggedIn,
  logOut,
})(MainHeader);