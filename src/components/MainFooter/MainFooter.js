import React from 'react';
import './MainFooter.css';

export default function MainFooter(){
    return(
        <div className='footerSection'>
            <section className='footerSectionContentContainerWrapper'>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Contact</h3> 
                       <h1>Contact us</h1>
                    </div>
                    <div>
                       <h3>About Us</h3> 
                       <h1>Careers</h1>
                    </div>
                </div>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Services & APIs</h3> 
                       <h1>We have no API</h1>
                    </div>
                    <div>
                       <h3>Support</h3> 
                       <h1>Customer support</h1>
                       <h1>It support</h1>
                       <h1>Device support</h1>
                    </div>
                </div>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Sales</h3> 
                       <h1>Contact Sales</h1>
                       <h1>Current Promotions</h1>
                    </div>
                    <div>
                       <h3>Terms and Agreements</h3> 
                       <h1>Privacy Policy</h1>
                       <h1>Terms of Use</h1>
                    </div>
                </div>
            </section>
        </div>
    )
}