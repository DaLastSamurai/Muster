import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingIcon from "../helperElements/LoadingIcon";
// this should probably use the infinite scroll npm module. 
// this recieves this.props.chatRoomName from MessageFrame

export default class MessageHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageHistory : [], 
    };
    this.getMessageHistory = this.getMessageHistory.bind(this)
  }

  componentDidMount() {
    this.getMessageHistory()
  }

  getMessageHistory() {
    // this will query the db for messages and push them to this.state.messageHistory
    // this may need to be called by the messageInput so that it can update when 
    // a new message is passed. May also need to use limitToFirst().
    let uid = firebaseAuth().currentUser.uid; 
    let messagesDbPath = `messages/${uid}/${this.props.chatRoomName}/history`
    firebase.database().ref(messagesDbPath).on('value', (snapshot) => {
      let messageObj = snapshot.val()
      let messageHistory = Object.keys(messageObj).map(key => messageObj[key])
      this.setState({messageHistory})
    })
  }



  render() {
    return  (
      <div className="chat-history">
        {/*=messageHistory=*/}
        <InfiniteScroll 
          style = {{height : '200px', overflow : 'auto'}}
          pageStart={1000}
          loadMore={() => {}}
          hasMore={false}
          loader={<LoadingIcon/>}
        >

        {this.state.messageHistory
          .sort((a, b) => b.createdAt - a.createdAt)
          .map(message => 
            <div> 
              {message['createdByUsername']} : {message['text']} 
            </div>
          )}

        </InfiniteScroll>

      </div> 
    )
  }
}