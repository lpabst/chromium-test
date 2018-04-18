import React, { Component } from 'react';
import MainHeader from './../../components/MainHeader/MainHeader.js';
import PageNameHeader from './../../components/PageNameHeader/PageNameHeader.js';
import './FaQ.css';


class FaQ extends Component {

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
                        <h1>FAQ</h1>
                    )}
                </ PageNameHeader >
            
            </section>
        );
    }
}


export default FaQ;