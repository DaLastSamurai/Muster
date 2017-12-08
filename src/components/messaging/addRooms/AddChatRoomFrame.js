import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../../config/firebaseCredentials'
import LinkButton from '../../helperElements/LinkButton'
import AutoCompleteInput from 'react-autocomplete'

// this recieves this.props.userChatRoomData from ChatRoomList 
// probably want to break this out to more subcomponents. 

export default class AddChatRoomFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName : "",
      isAddingChatRoom: false, 
      followerUsers: [],
      chatRoomMembers: [],
      autocompleteText : ""
    };
    this.toggleIsAddingChatRoom = this.toggleIsAddingChatRoom.bind(this)
    this.addCurrentUserToChatRoomMembers = 
      this.addCurrentUserToChatRoomMembers.bind(this)
    this.getFollowerUsers = this.getFollowerUsers.bind(this)
    this.removeUserWithId = this.removeUserWithId.bind(this)
    this.addSelectedUserToChatRoomMembers = 
      this.addSelectedUserToChatRoomMembers.bind(this)
    this.handleAddChatRoom = this.handleAddChatRoom.bind(this)
  }

  componentWillMount() {
    this.getFollowerUsers()
    this.addCurrentUserToChatRoomMembers()
  }

  toggleIsAddingChatRoom() {
    this.setState({isAddingChatRoom : !this.state.isAddingChatRoom})
  }

  getFollowerUsers() {
    // query the db for the users that are following the current user. The user
    // can only add users that are following them to the chat. 
    let uid = firebaseAuth().currentUser.uid
    let followersDbPath = `users/${uid}/profileInfo/followers`
    firebase.database().ref(followersDbPath).on('value', snap => {
      let followerUids = snap.val() || {}
      let followerUidArray = Object.keys(followerUids)
      // console.log('these are the followerUidArray', followerUidArray)
      followerUidArray.forEach(uid => {
        firebase.database().ref(`users/${uid}/profileInfo/username`).on('value',
          (label) => {
            let follwerObj = {}
            follwerObj['label'] = label.val()
            follwerObj['id'] = uid
            let followerUsers = this.state.followerUsers.concat([follwerObj])
            this.setState({ followerUsers })
          })
      })
    })
  }

  addCurrentUserToChatRoomMembers() {
    let userObj = {}
    userObj['id'] = firebaseAuth().currentUser.uid
    userObj['label'] = firebaseAuth().currentUser.displayName
    this.setState({ chatRoomMembers : [userObj] })
  }

  addSelectedUserToChatRoomMembers(username, uid) {
    // check to see if the member exists in the chat already, then add if not.
    if (this.state.chatRoomMembers.filter(obj => obj.id === uid).length === 0) {
      let newUserObj = {}
      newUserObj['label'] = username
      newUserObj['id'] = uid
      this.setState({chatRoomMembers: 
        [...this.state.chatRoomMembers, newUserObj]})
    }
  }

  removeUserWithId(uid) {
    console.log('this is the uid that is passed in when attempting to remove a user: ', uid)
  }

  handleAddChatRoom(e) {
    // this will handle adding a chatroom for all of the users that are listed 
    // in this.state.chatRoomMembers 
    if (this.state.roomName.length === 0) {
      this.state.roomName = 
        this.state.chatRoomMembers.map(user => user.label).join(', ') + ' chat'
    }
    console.log('this is the updated this.state.roomName', this.state.roomName)
    let uids = this.state.chatRoomMembers.map(user => user.id)
    uids.forEach((uid, i, uidsArr) => {
      let innerObj = {}
      innerObj['users'] = uidsArr; 
      let updateObj = {}; 
      updateObj[this.state.roomName] = innerObj
      console.log('this is the updateObj', updateObj)
      firebase.database().ref(`messages/${uid}`).update(updateObj)
    })
    // console.log('these are uids: ',uids)
  }

  render() {
    // console.log('this is the chatRoomMembers', this.state.chatRoomMembers)
    // console.log('this is the autocompleteText', this.state.autocompleteText)
    // console.log('this is the followerUsers in state', this.state.followerUsers)
    // console.log('this is the this.state.roomName',  this.state.roomName)
    return this.state.isAddingChatRoom 
    ? (
      <div>

        ==addChatRoom==
        <input
          autoComplete="off"
          className="form-control"
          name="location"
          type="text"
          placeholder="Chat Room Name"
          value={this.state.roomName}
          onChange={e => this.setState({roomName : e.target.value})}
          onKeyUp={this.checkSubmit}
        />
        You may add any user that is following you: 
        <div>
          <AutoCompleteInput
            items={this.state.followerUsers}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            renderItem={(item, highlighted) =>
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.label}
              </div>
            }
            value={this.state.autocompleteText}
            onChange={e => this.setState({ autocompleteText: e.target.value })}
            onSelect={(autocompleteText, user) => {this.setState({autocompleteText}, 
                this.addSelectedUserToChatRoomMembers(user['label'], user['id'])
              )} 
            }
          /> 
        </div>
        <button onClick = {this.handleAddChatRoom}>
          Publish Chat Room
        </button> 
        <div> 
          Users In ChatRoom: 
          {this.state.chatRoomMembers.map(member => 
            <div> 
              {member.label}   
              {/* The below is causing really wierd behavior 
              <button onClick={this.removeUserWithId(member.id)}> 
                x
              </button> 
              */}
            </div> 
            )
          }
        </div> 
        <button onClick = {this.toggleIsAddingChatRoom}> 
          Cancel
        </button> 
      </div> 
    )
    : (
      <div> 
        <button onClick = {this.toggleIsAddingChatRoom}> 
          Create a New Chat
        </button> 
      </div>
    )
  }
}