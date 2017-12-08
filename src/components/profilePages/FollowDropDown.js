import React from 'react';
import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Select from 'react-styled-select'
import { Route, Redirect, Link } from 'react-router'
import LinkButton from '../helperElements/LinkButton'

export default class FollowersDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followersDataArr : null,
      redirectURL: "",
    };
    this.handleDataToState = this.handleDataToState.bind(this)
    this.handleSelectAndRedirect = this.handleSelectAndRedirect.bind(this)
  }

  componentDidMount() {
    this.handleDataToState(Object.keys(this.props.users))
  }

  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps in', this.props.title, 'is called')
    if (this.props.users) {
      this.handleDataToState(Object.keys(this.props.users), [], () => { this.setState({redirectURL : ""}) })
    }
  }

  handleDataToState(userIds, followersDataArr = [], cb = () => {}) {
    // TODO: THIS IS AWFUL, FIX
    console.log('these are the userIds in the handleDataToState: ', userIds)
    // takes in the userIds and then queries the db to create an array of
    // followersData with the user's names. The cb is passed last. 
    if (userIds.length === 0) {
      this.setState({followersDataArr}, cb)
    }
    let userObj = {};
    let userToAdd = userIds.pop()
    let dbPath = `users/${userToAdd}/profileInfo`
    firebase.database().ref(dbPath).on('value', (snapshot) => {
    
    console.log('this is the snapshot.val in', this.props.title, ': ', snapshot.val())
      if (snapshot.val() !== null) { // for some reason, snapshot.val() is null sometimes. 
        userObj['value'] = userToAdd; // the uid. 
        userObj['label'] = snapshot.val().username // what the user sees in dropdown
        followersDataArr.push(userObj)
        this.handleDataToState(userIds, followersDataArr)
      }
    })
  }

  handleSelectAndRedirect(redirectURL) {
    // navigate to the profile of the selection
    this.props.updateProfileUID(redirectURL)
    this.setState({redirectURL})
    // just rerendering the page by refreshing it. 
    window.location.reload()
  }

  render() {
    console.log('this is the user props in', this.props.title, this.props.users)
    // console.log('this is the state in', this.props.title , this.state.followersDataArr)
    return this.state.followersDataArr === null 
    ? (<div> loading... </div>) 
    : this.state.redirectURL == ""
    ? (
      <div className="col-sm-2">
        <Select
          placeholder={this.props.title}
          options={this.state.followersDataArr}
          onValueClick={this.handleSelectAndRedirect}
          searchable={true}
        />
      </div>
    ) 
    : (
      <div className="col-sm-2">
        <div>
          You have been redirected (this should disapear on re-render)
          <Redirect from = '/profile' to = {this.state.redirectURL} />
        </div>
      </div>
    )
  }
}

