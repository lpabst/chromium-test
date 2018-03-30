import React from 'react';

export default function LoadingPopover() {

  return (
    <div className='login-popover_wrapper'>
      <div style={{width:'350px'}} id="login-popover_content-wrapper">
        <h2 id="login-popover_header">Loading...</h2>
        <img style={{width:'250px', display:'block', margin:'0 auto'}} src='https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
      </div>
    </div>
  )
}