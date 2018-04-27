import React from 'react';
import firebase from 'firebase';
import {firebaseAuth, users} from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'
import ChatRoomEntry from './ChatRoomEntry'
import AddChatRoomFrame from './addRooms/AddChatRoomFrame'
// THIS IS THE ENTRY POINT FOR THE CHAT FEATURE. 
/*
ChatRoomList (in userBar)
  \___AddChatRoomFrame (in userBar) (see AddChatRoom for logic)
   \__ChatRoomEntry (in userBar)
        \__onClick___MessageFrame (pops out into currentPage?)
                        \___MessageStatus
                         \__MessageHistory
                          \_MessageInputField
*/
// ChatRoomList is a sidebar container that holds a bunch of ChatRoomEntrys
// The ChatRoomEntrys handle querying the db for a user's chats so that, when 
// selected, they can open a MessageFrame that has the appropriate data in the 
// subComponents. 

export default class ChatRoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userChatRooms: {}
    };
    this.getUserChatRooms = this.getUserChatRooms.bind(this)
  }

  componentDidMount() {
    // this will cause the getUserChatRooms to be called twice. 
    this.getUserChatRooms()
  }

  getUserChatRooms() {
    // this function hits the db for the user's chats and sets this.state.userChats
    // with the chatRoomName. This information is then passed down to ChatRoomsEntry. 
    let uid = firebaseAuth().currentUser.uid
    let dbPath = `messages/${uid}`
    firebase.database().ref(dbPath).on('value', (snapshot) => {
      let userChatRooms = snapshot.val() || {}
      this.setState({userChatRooms})
    })
  }


  render() {
    return (
      <div>
        <AddChatRoomFrame userChatRoomData={this.state.userChatRoomData}/>

        {Object.keys(this.state.userChatRooms).length === 0
          ? (<h6 className="nochatroom-text">You don't have any chats yet</h6>)
          : (
            <div>
              <ul className="ChatRoomEntries">
                {
                  Object.keys(this.state.userChatRooms).map((chatRoomName) => {
                    let chatRoomData = this.state.userChatRooms[chatRoomName]
                    return <ChatRoomEntry
                      key={chatRoomName}
                      chatRoomName={chatRoomName}
                      chatRoomData={chatRoomData}
                    />
                  })
                }
              </ul>
            </div>
          )
        }
      </div>
    )
  }
}