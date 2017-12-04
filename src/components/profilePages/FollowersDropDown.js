import React from 'react';

import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Select from 'react-select'
// this is getting called by the profile

export default class FollowersDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followersDataArr : null, 
    };
    this.handleDataToState = this.handleDataToState.bind(this) 
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    console.log('these are the followers', this.props.followers)
    this.handleDataToState(this.props.followers)
  }

  handleDataToState(userIds, followersDataArr = []) {
    // takes in the userIds and then queries the db to create an array of 
    // followersData. This includes the follower's uid, picture and username.
    // if this stops working, it is likely because the uids that are being looked
    // up do not exist.  
    if (userIds.length === 0) { return this.setState({followersDataArr}) }
    let userObj = {};
    let userToAdd = userIds.pop()
    let dbPath = `users/${userToAdd}/profileInfo`
    // console.log('this is the dbpath', dbPath)
    userObj['uid'] = userToAdd; 
    firebase.database().ref(dbPath).on('value', (snapshot) => {
      // console.log('this is the snapshot: ', snapshot.val())
      userObj['profilePhoto'] = snapshot.val().profilePhoto; 
      userObj['username'] = snapshot.val().username
      console.log('this is the userObj', userObj)
      followersDataArr.push(userObj)
      this.handleDataToState(userIds, followersDataArr)  
    })
  }

  handleSelect(selectedOption) {
    // navigate to the profile of the selection
    console.log('this is what is passed to the handleSelect :', selectedOption)
  }

  render() {
    console.log('this is the state in FollowersDropDown: ', this.state.followersDataArr)
    return this.state.followersDataArr === null ? (<div> loading... </div>) : 
    (
      <div>


      </div> 
    )
  }
}










