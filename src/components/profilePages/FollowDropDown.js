import React from 'react';

import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Select from 'react-styled-select'
import { Route, Redirect, Link } from 'react-router'
import LinkButton from '../helperElements/LinkButton'
// this is getting called by the profile

export default class FollowersDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followersDataArr : null,
      formattedData : null,
      redirectURL : "",
    };
    this.handleDataToState = this.handleDataToState.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.formatData = this.formatData.bind(this)
  }

  componentDidMount() {
    this.handleDataToState(this.props.users)
  }

  handleDataToState(userIds, followersDataArr = []) {
    // takes in the userIds and then queries the db to create an array of
    // followersData. This includes the follower's uid, picture and username.
    // if this stops working, it is likely because the uids that are being looked
    // up do not exist.
    if (userIds.length === 0) {
      this.formatData(followersDataArr)
      return this.setState({followersDataArr})
    }
    let userObj = {};
    let userToAdd = userIds.pop()
    let dbPath = `users/${userToAdd}/profileInfo`
    userObj['uid'] = userToAdd;
    firebase.database().ref(dbPath).on('value', (snapshot) => {
      userObj['profilePhoto'] = snapshot.val().profilePhoto;
      userObj['username'] = snapshot.val().username
      followersDataArr.push(userObj)
      this.handleDataToState(userIds, followersDataArr)
    })
  }

  formatData(userData) {
    let formattedData = userData
      .map(follower => {
        var followerObj = {}
        followerObj['label'] = follower.username
        followerObj['value'] = follower.uid
        return followerObj;
      })
    this.setState({formattedData})
  }

  handleSelect(selectedOption) {
    // navigate to the profile of the selection
    console.log('this is what is passed to the handleSelect :', selectedOption)
    this.props.updateProfileUID(selectedOption)
    let redirectURL = `${selectedOption}`
    this.setState({redirectURL})
  }

  render() {
    console.log('this is the state in FollowersDropDown: ', this.state.followersDataArr)
    return this.state.formattedData === null ? (<div> loading... </div>) :
    this.state.redirectURL === ""
    ? (
      <div className="col-sm-2">
        <Select
          placeholder={this.props.title}
          options={this.state.formattedData}
          onValueClick={this.handleSelect}
          searchable={true}
        />
      </div>
    ) : (
      <div className="col-sm-2">
        <Select
          placeholder={this.props.title}
          options={this.state.formattedData}
          onValueClick={this.handleSelect}
          searchable={true}
        />
        <div>
        You have been redirected
          <Redirect from = '/profile' to={this.state.redirectURL} />
        </div>
      </div>
    )
  }
}


  /* if I am going to do this method, I need to rerender in the profileFrame
  <div>
  You are being redirected
  <Redirect from = '/profile' to={this.state.redirectURL} />
  </div>
  */
