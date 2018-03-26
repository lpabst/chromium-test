import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

import MainHeader from './../../components/MainHeader/MainHeader.js';
import LandingMessage from './../../components/LandingMessage/LandingMessage.js';
import LandingMessageFooter from './../../components/LandingMessage/LandingMessageFooter.js';
import PageNameHeader from '../../components/PageNameHeader/PageNameHeader.js';
import PictureWithMessage from '../../components/PictureWithMessage/PictureWithMessage.js';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailInput:'',
      passwordInput:'',
    }

  }

  launchIG = () => {
    axios.post('/api/launchIG/', {email:this.state.emailInput, password:this.state.passwordInput})
  }

  render() {
    console.log(this.state);
    return (
      <div className="home_wrapper">
        < MainHeader />
        < PageNameHeader>
          {() => (
            <h1>Home</h1>
          )}
        </ PageNameHeader >
        < LandingMessage />
        {/* < LandingMessageFooter /> */}
        < PageNameHeader>
          {() => (
            <h1>FIND MORE FREEDOM</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://wallup.net/wp-content/uploads/2016/01/311247-landscape-beach-people-couple.jpg')"}} className="picture-with-message_background-div">
              <div className="picture-with-message_gradient-first">
                <div className="picture-with-message_text-left-wrapper">
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>Spend More Time</h2>
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>Doing THIS.</h2>
                  <p className="picture-with-message_get-started">Get Started</p>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
        < PageNameHeader>
          {() => (
            <h1>FIND MORE CREATIVIY</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://iso.500px.com/wp-content/uploads/2016/03/pedroquintela.jpg')"}} className="picture-with-message_background-div">
              <div className="picture-with-message_gradient-first">
                <div className="picture-with-message_text-right-wrapper">
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder',}}>Spend More Time</h2>
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>On CONTENT.</h2>
                  <p style={{textAlign:'right'}} className="picture-with-message_get-started">Get Started</p>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
        <input onChange={(e) => this.setState({emailInput:e.target.value})}/>
        <input onChange={(e) => this.setState({passwordInput:e.target.value})}/>
        <button onClick={this.launchIG}> Launch IG </button>
      </div>
    );
  }
}

export default Home;