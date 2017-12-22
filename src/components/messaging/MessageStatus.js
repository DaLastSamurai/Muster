import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'

// this is a bar at the top of the messageFrame. It will display the 
// messageMembers 
// this recieves this.props.chatRoomName from MessageFrame

export default class MessageStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users : [], 
    };
    this.getUsers = this.getUsers.bind(this)
  }

  componentWillMount() {
    this.getUsers(this.props.chatRoomName)
  }

  getUsers(roomName) {
    // this takes in the roomName, finds the current user, and returns the users
    console.log('this is the roomName in the MessageStatus', roomName)
  }

  render() {
    
    return  (
      <div className="chat-status">
        {/* =messageStatus= */}
        

      </div> 
    )
  }
}