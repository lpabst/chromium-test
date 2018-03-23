import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

import MainHeader from './../../components/MainHeader/MainHeader.js';
import LandingMessage from './../../components/LandingMessage/LandingMessage.js';
import LandingMessageFooter from './../../components/LandingMessage/LandingMessageFooter.js';

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
        < LandingMessage />
        < LandingMessageFooter />
        <input onChange={(e) => this.setState({emailInput:e.target.value})}/>
        <input onChange={(e) => this.setState({passwordInput:e.target.value})}/>
        <button onClick={this.launchIG}> Launch IG </button>
      </div>
    );
  }
}

export default Home;