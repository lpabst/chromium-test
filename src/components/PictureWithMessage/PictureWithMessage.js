import React, { Component } from 'react';

import './PictureWithMessage.css';

class PictureWithMessage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='picture-with-message_wrapper'>
        <div>
          {
            this.props.children()
          }
        </div>
      </div> 
    );
  }
}

export default PictureWithMessage;