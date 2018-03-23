import React from 'react';

import './LandingMessage.css';


export default function LandingMessage() {

    return (
      <div className="landing-message_wrapper">
        <div className='section1'>
            <div className='section1Left'>
                <div className='section1LeftContent'>
                    <h1>Discover Your Next Level Of</h1>
                    <h1>Social Media Managment</h1>
                    <h3>Introducing all-new, hands-off, smart automation</h3>
                    <p>Learn More >></p>
                </div>
            </div>
            <div className='section1Right'>
                <img src="https://www.giveffect.com/home/images/assets/smart-automation.png" alt=""/>
            </div>
        </div>
      </div>
    )
}