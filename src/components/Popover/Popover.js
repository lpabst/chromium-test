import React, { Component } from 'react';

class Popover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameInput:''
    }

  }

  tester(){
    console.log('blurred')
  }

  componentDidMount(event){
    console.log(this.popoverWrapper.getBoundingClientRect(), window.innerHeight)
    this.getPopoverPosition()
    this.popoverWrapper.focus()
    console.log("focus is:", document.activeElement)
  }

  getPopoverPosition = () => {
    const parentHeight = this.props.parentHeight
    let popoverWrapper = this.popoverWrapper.getBoundingClientRect()
    let right = popoverWrapper.right <= window.innerWidth ? JSON.stringify(popoverWrapper.right) + 'px' : '10px'
    let bottom = popoverWrapper.bottom >= window.innerHeight ? JSON.stringify(parentHeight + 12) + 'px' : '-' + JSON.stringify(popoverWrapper.height - (parentHeight/2.5)) + 'px'
    console.log(right, bottom)
    this.setState({ right, bottom })
  }

  render() {
    const { width, height, closePopover, usernameInput, parent } = this.props
    const { right, bottom } = this.state
    console.log('props', this.props, 'state', this.state)
    return (
        <div
          onBlur={() => this.tester()}
          ref={(pw) => { this.popoverWrapper = pw }} 
          style={{background:'pink', zIndex:1000, position:'absolute', width:this.props.width, height:this.props.height, left:this.props.parent.x, top:this.props.parent.y + this.props.parent.height}}
        >
          <div onClick={() => closePopover()} style={{position:'absolute', left:'-10px', top:'-10px'}}>
            <h1 style={{color:'black', background:'red', borderRadius:'50%', padding:'0px 3px'}}>x</h1>
          </div>
          {
            this.props.children({
              width,
              height,
              right,
              bottom,
              closePopover,
              usernameInput,
            })
          }
        </div>
      )
  }
}

export default Popover;