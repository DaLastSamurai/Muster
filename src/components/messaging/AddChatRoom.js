import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'

// this is at the top of the ChatRoomEntry and manages

export default class AddChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getUsers = this.getUsers.bind(this)
  }

  componentWillMount() {
    this.getUsers(this.props.chatRoomNames)
  }

  getUsers(roomName) {
    // this takes in the roomName, finds the current user, and returns the users
    // in the 

  }

  handleAddChatRoom(e) {
    // this will handle adding a chatroom on sub 
    

    // this needs to finish by triggering a rerender in the chatroom so that the 
    // db is queried for the new chatRooms. 
  }

  render() {
    
    return  (
      <div>
        ==addChatRoom==


      </div> 
    )
  }
}