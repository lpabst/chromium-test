import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Popover from './../Popover/Popover.js'
// import GlobalState from './../../GlobalState.js'

// import './../../App.css';

import './MainHeader.css';

class MainHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navActive:[
        'active',
        '',
        '',
        '',
        ''
      ],
      loggedIn: false,
      showLoginPopover: false,
      usernameInput: '',
    }

  }

  updateStyle = (tagIndex) => {
    let navActive = [...this.state.navActive];
    for(let i=0;i<navActive.length;i++){
      navActive[i] = '';
    };
    navActive[tagIndex] = 'active';
    this.setState({
      navActive
    });
  };

  openPopover = () => {
    console.log("What I need", this.headerLoginButton.getBoundingClientRect())
    if(!this.state.showLoginPopover){
      this.setState({showLoginPopover: true})
    }
  }

  closePopover = () => {
    this.setState({showLoginPopover: false})
  }

  toggleLoginPopover = () => {
    return (
      <div onBlur={this.closePopover}>
        {this.state.showLoginPopover &&
          <Popover 
            width={'200px'} 
            height={'300px'} 
            closePopover={this.closePopover} 
            usernameInput={this.state.usernameInput}
            parent={this.headerLoginButton.getBoundingClientRect()}
          >
            {({ width, height, right, bottom, closePopover, usernameInput, }) => (
              <div>
                {this.state.loggedIn &&
                  <div>
                    <div>Hello {this.state.username}</div>
                    <div onClick={() => { closePopover(); }}>Log Out</div>
                  </div>
                }
                {!this.state.loggedIn &&
                  <div>
                    <input onChange={(e) => this.setState({usernameInput: e.target.value})}/>
                    {/* <div onClick={() => { globalState.login({ username:usernameInput }); closePopover(); }}>Login</div> */}
                  </div>
                }
              </div>
            )}
          </Popover>
        }
      </div>
    )
  }
  
  showUsernameOrLogin = () => {
    let username = this.props.loggedIn ? this.props.username :  "Login/Join"
    return (
      <h1 
        style={{paddingRight:'20px', fontSize:'18px'}}
        onClick={() => this.openPopover()}
        ref={(u) => { this.headerLoginButton = u }}
        className="main-header_login-username"
      >
        {String.fromCharCode(9663)}
        &nbsp;
        &nbsp;        
        {username}
        {this.toggleLoginPopover()}
      </h1>
    )
  }

  render() {
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
                <Link to="/" onClick={() => this.updateStyle(0)} style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast" href="#">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className={`nav-item ${this.state.navActive[1]}`}>
                <a onClick={() => this.updateStyle(1)} style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast" href="#">Discover</a>
              </li>
              <li className={`nav-item ${this.state.navActive[2]}`}>
                <a onClick={() => this.updateStyle(2)} style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast" href="#">FAQ</a>
              </li>
              <li className={`nav-item ${this.state.navActive[3]}`}>
                <a onClick={() => this.updateStyle(3)} style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast" href="#">Support</a>
              </li>
              <li className={`nav-item ${this.state.navActive[4]}`}>
                <a onClick={() => this.updateStyle(4)} style={{fontSize:"18px", fontWeight:"bold"}} className="nav-link moveFast" href="#">About Us</a>
              </li>
            </ul>
            {this.showUsernameOrLogin()}
            <div style={{ width:'2px', height:'45px', background:'#666'}}></div>
            <form className="form-inline my-2 my-lg-0" style={{paddingRight:'10px', paddingLeft:'20px'}}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{height:'25px'}}/>
              <button className="btn btn-outline-info my-2 my-sm-0" type="submit" style={{ padding:'0px 10px'}}>Search</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default MainHeader;