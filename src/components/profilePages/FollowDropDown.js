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
      redirectURL: "", //TODO: this is not getting RESET!!!!
    };
    this.handleDataToState = this.handleDataToState.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.handleDataToState(this.props.users)
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
    this.handleDataToState(this.props.users)
  }

  handleDataToState(userIds, followersDataArr = []) {
    // takes in the userIds and then queries the db to create an array of
    // followersData. This includes the follower's uid, picture and username.
    // if this stops working, it is likely because the uids that are being looked
    // up do not exist.
    if (userIds.length === 0) {
      return this.setState({followersDataArr})
    }
    let userObj = {};
    let userToAdd = userIds.pop()
    let dbPath = `users/${userToAdd}/profileInfo`
    userObj['value'] = userToAdd; // the 
    firebase.database().ref(dbPath).on('value', (snapshot) => {
      userObj['profilePhoto'] = snapshot.val().profilePhoto;
      userObj['label'] = snapshot.val().username
      followersDataArr.push(userObj)
      this.handleDataToState(userIds, followersDataArr)
    })
  }

  handleSelect(redirectURL) {
    // navigate to the profile of the selection
    this.props.updateProfileUID(redirectURL)
    this.setState({redirectURL})
  }

  render() {
    // console.log('this.state.redirectURL', this.state.redirectURL)
    // console.log('this is the state in FollowersDropDown: ', this.state.followersDataArr)
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
        <div>
          You have been redirected (this should disapear on re-render)
          <Redirect from = '/profile' to = {this.state.redirectURL} />
        </div>
      </div>
    )
  }
}

