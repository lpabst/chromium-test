import React, { Component } from 'react';

// import Popover from './../Popover/Popover.js'
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
      showLoginPopover: false,
      usernameInput: '',
    }

  }

  handleUsernameInput = () => {

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
    if(!this.state.showLoginPopover){
      this.setState({showLoginPopover: true})
    }
  }

  closePopover = () => {
    this.setState({showLoginPopover: false})
  }

  // toggleLoginPopover = () => {
  //   return (
  //     <div onBlur={this.closePopover}>
  //       {this.state.showLoginPopover &&
  //         <Popover 
  //           width={'200px'} 
  //           height={'300px'} 
  //           closePopover={this.closePopover} 
  //           globalState={this.props.globalState} 
  //           usernameInput={this.state.usernameInput}
  //           parentHeight={this.headerLoginButton.getBoundingClientRect().height || 10}
  //         >
  //           {({ width, height, right, bottom, closePopover, globalState, usernameInput, }) => (
  //             <div>
  //               {globalState.loggedIn &&
  //                 <div>
  //                   <div>Hello {globalState.username}</div>
  //                   <div onClick={() => { globalState.logOut(); closePopover(); }}>Log Out</div>
  //                 </div>
  //               }
  //               {!globalState.loggedIn &&
  //                 <div>
  //                   <input onChange={(e) => this.setState({usernameInput: e.target.value})}/>
  //                   <div onClick={() => { globalState.login({ username:usernameInput }); closePopover(); }}>Login</div>
  //                 </div>
  //               }
  //             </div>
  //           )}
  //         </Popover>
  //       }
  //     </div>
  //   )
  // }
  
  showUsernameOrLogin = () => {
    let username = this.props.loggedIn ? this.props.username :  "Login/Join"
    return (
      <h1 
        style={{color:"white", paddingRight:'20px', fontSize:'18px'}}
        onClick={() => this.openPopover()}
        ref={(u) => { this.headerLoginButton = u }}
      >
        {String.fromCharCode(9663)}
        &nbsp;
        &nbsp;        
        {username}
        {/* {this.toggleLoginPopover()} */}
      </h1>
    )
  }

  render() {
    return (
      <div className="mainHeader_wrapper">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{maxWidth:'1320px', margin:'0 auto'}}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a style={{fontSize:"50px"}} className="navbar-brand" href="#">FOLLOW</a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav nav nav-tabs mr-auto mt-2 mt-lg-0">
              <li className={`nav-item ${this.state.navActive[0]}`}>
                <a onClick={() => this.updateStyle(0)} style={{fontSize:"18px"}} className="nav-link moveFast" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className={`nav-item ${this.state.navActive[1]}`}>
                <a onClick={() => this.updateStyle(1)} style={{fontSize:"18px"}} className="nav-link moveFast" href="#">Link</a>
              </li>
              <li className={`nav-item ${this.state.navActive[2]}`}>
                <a onClick={() => this.updateStyle(2)} style={{fontSize:"18px"}} className="nav-link moveFast" href="#">Disabled</a>
              </li>
              <li className={`nav-item ${this.state.navActive[3]}`}>
                <a onClick={() => this.updateStyle(3)} style={{fontSize:"18px"}} className="nav-link moveFast" href="#">Disabled</a>
              </li>
              <li className={`nav-item ${this.state.navActive[4]}`}>
                <a onClick={() => this.updateStyle(4)} style={{fontSize:"18px"}} className="nav-link moveFast" href="#">Disabled</a>
              </li>
            </ul>
            {this.showUsernameOrLogin()}
            <div style={{ width:'2px', height:'45px', background:'white'}}></div>
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