import React, { Component } from 'react';
import MainHeader from './../../components/MainHeader/MainHeader.js';
import PageNameHeader from './../../components/PageNameHeader/PageNameHeader.js';
import './About.css'


class About extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }

    }

    componentDidMount(){
        
    }

    render() {
        return (
            <section className='routeWrapper'>
                
                < MainHeader />
                < PageNameHeader>
                    {() => (
                        <h1>About Us</h1>
                    )}
                </ PageNameHeader >

                <div className='about_content_wrapper'>
                    <p className='about_content'>We're a small company based out of Utah. We started with an idea: Help people grow their social media following on Instagram. In theory this can help a business reach a greater audience, or help an individual jumpstart a social media following.</p>
                    <p className='about_content'>Taking the time to manually increase your following on Instagram can be a drain on your time and energy. Why not automate the process? Our software has a tried and tested algorithm that helps increase your following so you don't have to!</p>
                </div>

            </section>
        );
    }
}


export default About;