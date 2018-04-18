import React, { Component } from 'react';
import MainHeader from './../../components/MainHeader/MainHeader.js';
import PageNameHeader from './../../components/PageNameHeader/PageNameHeader.js';
import './FaQ.css';

class FaQ extends Component {

    constructor(props){
        super(props);
        this.state = {
            questions: [
                {
                    q: 'What results can I expect?',
                    a: 'Our test accounts average anywhere from 500-2000 new followers per month, depending on the content being posted. Remember, our software brings in followers by the bucketload, but your content is what will keep your new followers around and drive high engagement levels!'
                },
                {
                    q: 'What kind of contract is there?',
                    a: 'Our service is month to month, no contract required! To start you off, we will sign you up for a free 1-week trial to make sure you like what you are paying for. After the week ends, your month to month service kicks in automatically, no further action required on your end! Cancel anytime you want, no hard feelings :)'
                },
                {
                    q: 'Do you support automatic payments?',
                    a: 'You bet! We accept all major credit cards and can set you up on a month to month automatic payment system. That way you know your account is taken care of without you having to worry about it.'
                },
                {
                    q: 'How much does it cost?',
                    a: 'Our pricing varies by situation, and often times we can sign you up with one of the sweet deals we have going month to month. The standard rate is $69.99/month, but talk to one of our sales persons to see if we have any sales going on!'
                },
            ]
        }

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

                <div className='faq_content'>
                    { this.state.questions.map( (item, i) => {
                        return <div className='faq'>
                            <h1>{item.q}</h1>
                            <p>{item.a}</p>
                        </div>
                    })}
                </div>
            
            </section>
        );
    }
}

export default FaQ;