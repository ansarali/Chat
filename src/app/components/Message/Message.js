import React, { Component, PropTypes } from 'react';
import img from "../../../public/images.jpg"

export default class Message extends Component {

  constructor(props) {
    super(props)

    this.state = {};

   }

 
  render() {
    let isCurrentUser = false;
    if (this.props.name === this.props.messageName) {
      isCurrentUser = true;
    }
    console.log("this.props", this.props)
    return (
      <div className={isCurrentUser ? "message-container right" : "message-container left"}>
        <div className="image-outer">
        <img src={img} />
        <span className="time">{this.props.time}</span>
        </div>
        <div className={isCurrentUser ? "message-bubble red" : "message-bubble"}>
        <p className="title"><b>{this.props.messageName}</b></p>
        <p>{this.props.message}</p></div>
        
      </div>
    );
  }
}

