import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'
import MessageStatus from './MessageStatus'
import MessageHistory from './MessageHistory'
import MessageInputField from './MessageInputField'

// this will be loading in the sidebar for now. Eventually, we will want this to
// be loading on the app. To do this, we will move this component to the app and
// pass data up to the app so that it can properly render. 

export default class MessageFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }



  render() {
    
    return  (
      <div style = {{'border-radius' : "1px"}}className = "MessageFrame">

        <MessageStatus chatRoomName = {this.props.chatRoomName}/> 
        <MessageInputField chatRoomName = {this.props.chatRoomName}/> 
        <MessageHistory chatRoomName = {this.props.chatRoomName} /> 
      </div> 
    )
  }
}