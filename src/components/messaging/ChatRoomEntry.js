import React from 'react';
import MessageFrame from './MessageFrame'
// receives the chatRoomName. When clicked, it should render the 

export default class ChatRoomEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMessageFrameOpen : false, 
    }; 
    this.toggleMessageFrame = this.toggleMessageFrame.bind(this)
  }

  toggleMessageFrame(e) {
    // to make the messageFrame pop out on the app, just move this func and the 
    // messageFrame to the app.js
    this.setState({isMessageFrameOpen : !this.state.isMessageFrameOpen})
  }

  render() {
    return this.state.isMessageFrameOpen 
    ? (
      <div> 
        <button onClick = {this.toggleMessageFrame}>
          {this.props.chatRoomName}
        </button> 
        
        <MessageFrame chatRoomName = {this.props.chatRoomName}/> 
      </div> 
      )
    : (
      <div>
        <button onClick = {this.toggleMessageFrame}>
           {this.props.chatRoomName}
        </button> 
      </div> 
    )
  }
}