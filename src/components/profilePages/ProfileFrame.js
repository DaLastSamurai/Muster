import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import { isStringAcceptable } from './profileHelpers.js'
// components: 
import FavoriteCategories from './FavoriteCategories'
import FollowButton from './FollowButton'
import FollowersDropDown from './FollowersDropDown'
import FollowingDropDown from './FollowingDropDown'
// dynamic text editing: 
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'
// this profile is always called by a route in the form /profile/:uid

export default class ProfileFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "", // this gets set by setCurrentUserAndIsUsersProfile()
      // this could either be the profileUID of some user, or the 
      // profile UID of the current logged in user. 
      profileUID: this.props.match.params.uid, 
      // this is boolean that is true when the user that is on the profile page
      // is the user that is currently logged in. If true, the user can edit the profile. 
      isUsersProfile: false, // this gets set by setCurrentUserAndIsUsersProfile()

      // these are all user fields:
      // these are the fields that will be handled by the reik text fields. 
      bio: null, 
      username: null, 
      
      // this is handled by Yusaku's avatar uploader. 
      profilePhoto: null, 

      // handles the social: 
      following: null, 
      followers: null, 

      // this is passed down. 
      favoriteCategories: null, 
    }; 
    this.isStringAcceptable = isStringAcceptable.bind(this) // imported from profileHelpers.js
    this.addUserDataToState = this.addUserDataToState.bind(this)
    this.sendUpdatedUserDataToDB = this.sendUpdatedUserDataToDB.bind(this)
  }

  componentDidMount() {
    this.setCurrentUserAndIsUsersProfile()
    this.addUserDataToState(["bio", "username", "profilePhoto", "following", "followers", "favoriteCategories"])
  }

  setCurrentUserAndIsUsersProfile() {
    let currentUser = "none" 
    if (firebase.auth().currentUser !== null) {
      currentUser = firebase.auth().currentUser.uid
    }
    this.setState({currentUser}, () => {
      if (currentUser === this.props.match.params.uid) {
        this.setState({isUsersProfile : true})
      }
    })
  }

  addUserDataToState(fieldsToAddToState = [], stateObj = {}) {
    // takes in an array of fieldsToAddToState, queries the db and sets state with result
    // recursively calls each element in the array and renders it. 
    if (fieldsToAddToState.length === 0) {return this.setState(stateObj)} 
    else {
      let currentField = fieldsToAddToState.pop() 
      let dbPath = `users/${this.state.profileUID}/profileInfo/${currentField}`
      firebase.database().ref(dbPath).on('value', (snapshot) => {
        stateObj[currentField] = snapshot.val()
        this.addUserDataToState(fieldsToAddToState, stateObj) // call the recursive function 
      })
    }
  }

  sendUpdatedUserDataToDB(fieldData) {
    // takes in a string that is the field that needs to be 
    console.log('this is what gets sent to sendUpdatedUserDataToDB:', fieldData)
    let update = {} 
    if (fieldData.text !== undefined) { // if the user name 
      update[`${this.state.profileUID}/profileInfo/username`] = fieldData.text
      // triggers re-render which will push new data to state with addUserDataToState
      users.update(update) 
    } else { // if the bio. 
      update[`${this.state.profileUID}/profileInfo/bio`] = fieldData.textarea
      // triggers re-render which will push new data to state with addUserDataToState
      users.update(update)     
    }

    // this addUserDataToState and thus needs to send the 
    // the fieldData as an array. 
    // this.addUserDataToState([fieldData]) 
  }


  render() {
    // console.log('this is the props', this.props)
    console.log('this is the state', this.state)
    // starts by checking to see if the state is loaded. 
    return this.state.bio === null ? (<div> loading... </div> ) : (
      <div>
        {this.state.isUsersProfile && this.state.currentUser !== 'none' 
          ? <div /> 
          : <FollowButton /> 
        }
        <FollowersDropDown followers = {this.state.followers} /> 
        <FollowingDropDown following = {this.state.following}/> 
        {this.state.isUsersProfile 
          ? (
            <div> 
              This is where all of the editable text fields will go. 
              Username (click to edit): 
              <RIEInput
                value={this.state.username}
                change={this.sendUpdatedUserDataToDB}
                propName="text"
                validate={this.isStringAcceptable}
                classLoading="loading"
                // classInvalid="invalid"
              />
              Bio (click to edit): 
              <RIETextArea
                value={this.state.bio}
                change={this.sendUpdatedUserDataToDB}
                propName="textarea"
                validate={this.isStringAcceptable}
                classLoading="loading"
                // classInvalid="invalid"
              />
            </div>
          ) : (
            <div> 
              bio: {this.state.bio}
              Username: {this.state.username}
            </div>
          )
        }
        {/* this is going to look like the bespintrest (hopefully) */}
        <FavoriteCategories favoriteCategories={this.state.favoriteCategories} /> 
      </div> 
    )
  }
}










