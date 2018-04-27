import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'
import { isStringAcceptable } from '../profilePages/profileHelpers'

export default class MessageInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : ""
    };
    this.pushMessageToDatabase = this.pushMessageToDatabase.bind(this)
    this.checkSubmit = this.checkSubmit.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
  }

  setInputValue(e) {this.setState({inputValue : e.target.value})}

  checkSubmit(e) {
    // this checks to see if the user pushed the enter key, also 
    // checking if submit is valid
    if (e.key === 'Enter' && isStringAcceptable(this.state.inputValue)) 
    {
      this.pushMessageToDatabase(this.state.inputValue, 
        () => {this.setState({inputValue : ""})}
      )
    }
  }

  pushMessageToDatabase(messageText, cb) {
    let user = firebaseAuth().currentUser
    let messageObj = {};
    messageObj['text'] = messageText; 
    messageObj['createdByUid'] = user.uid; // lookup username later
    messageObj['createdAt'] = Date.now();

    let getUsernameDbPath = `users/${user.uid}/profileInfo/username`
    firebase.database().ref(getUsernameDbPath).on('value', username => {
      messageObj['createdByUsername'] = username.val()

      let userDbPath = `messages/${user.uid}/${this.props.chatRoomName}/users`
      firebase.database().ref(userDbPath).on('value', (snapshot) => {
        
        // push the data to all of the chatMembers. 
        let chatMembers = Object.values(snapshot.val())
        chatMembers.forEach(uid => {
          let dbPath = `messages/${uid}/${this.props.chatRoomName}/history`
          firebase.database().ref(dbPath).push().set(messageObj) 
        })

        cb() // this needs to be refactored with promises.  
      })

    })
  }

  render() {

    return  (
      <div className="chat-input-field">
        {/*=messageInputField= */}
        <input
          autoComplete="off"
          className="form-control"
          name="location"
          type="text"
          placeholder="Enter your message"
          value={this.state.inputValue}
          onChange={this.setInputValue}
          onKeyUp={this.checkSubmit}
        />

      </div> 
    )
  }
}