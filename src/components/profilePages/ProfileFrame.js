import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import { isStringAcceptable } from './profileHelpers.js'
// components:
import FavoriteCategories from './FavoriteCategories'
import FollowButton from './FollowButton'
import FollowDropDown from './FollowDropDown' // for both followers and following.
import ImageUpload from '../helperElements/imageUploader'
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

      readyToRender: false,
    };
    this.isStringAcceptable = isStringAcceptable.bind(this) // imported from profileHelpers.js
    this.addUserDataToState = this.addUserDataToState.bind(this)
    this.sendUpdatedUserDataToDB = this.sendUpdatedUserDataToDB.bind(this)
    this.updateProfileUID = this.updateProfileUID.bind(this)
    this.setImageState = this.setImageState.bind(this)
  }

  componentWillMount() {
    // console.log('the state has changed: ', this.state.profileUID)
    this.setCurrentUserAndIsUsersProfile()
    this.addUserDataToState(["bio", "username", "profilePhoto", "following", "followers", "favoriteCategories"])
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('this is the current state: ', this.state)
    // console.log('this is the next state: ', nextState)
    // console.log('shouldComponentUpdate: ', !(JSON.stringify(nextState) === JSON.stringify(this.state)))
    return (JSON.stringify(nextState) !== JSON.stringify(this.state))
  }

  componentDidUpdate() {
    this.setCurrentUserAndIsUsersProfile()
    this.addUserDataToState(["bio", "username", "profilePhoto", "following", "followers", "favoriteCategories"])
  }

  setCurrentUserAndIsUsersProfile() {
    // precarious
    let currentUser = "none"
    if (firebase.auth().currentUser !== null) {
      currentUser = firebase.auth().currentUser.uid
    }
    this.setState({currentUser}, () => {
      if (currentUser === this.props.match.params.uid) {
        this.setState({isUsersProfile : true})
      } else {
        this.setState({isUsersProfile : false})
      }
    })
  }

  addUserDataToState(fieldsToAddToState = [], stateObj = {}) {
    // takes in an array of fieldsToAddToState, queries the db and sets state with result
    // recursively calls each element in the array and renders it.
    if (fieldsToAddToState.length === 0) {this.setState(stateObj)}
    else {
      let currentField = fieldsToAddToState.pop()
      let dbPath = `users/${this.state.profileUID}/profileInfo/${currentField}`
      firebase.database().ref(dbPath).on('value', (snapshot) => {
        stateObj[currentField] = snapshot.val()
        this.addUserDataToState(fieldsToAddToState, stateObj) // call the recursive function
      })
    }
  }

  setImageState(profilePhoto) {
    let dbPath = `${this.state.currentUser}/profileInfo/profilePhoto`;
    let update = {}; 
    update[dbPath] = profilePhoto; 
    users.update(update);
    this.setState({profilePhoto});
  }

  updateProfileUID(profileUID) { this.setState( {profileUID} ) }

  sendUpdatedUserDataToDB(fieldData) {
    let update = {}
    if (fieldData.text !== undefined) { // if the user name
      update[`${this.state.profileUID}/profileInfo/username`] = fieldData.text;
      users.update(update);
    }
    // might need to replace this:
    if (fieldData.textarea !== undefined) { // if the bio.
      update[`${this.state.profileUID}/profileInfo/bio`] = fieldData.textarea;
      users.update(update);
    }
  }


  render() {
    // console.log('this is the props', this.props)
    // console.log('this is the state in profileFrame', this.state)
    // starts by checking to see if the state is loaded.
    return Object.values(this.state).filter(el => el === null).length > 0
      ? (<div> loading... </div> ) 
      : (
        <div>
          <div className = "followBar"> 
            {this.state.isUsersProfile 
              ? <div />
              : <FollowButton 
                  currentUser={this.state.currentUser} 
                  following={this.state.following}
                  profileUID={this.state.profileUID}
                />
            }
          
            <FollowDropDown
              title = {"followers"}
              users = {this.state.followers}
              updateProfileUID = {this.updateProfileUID}
            />
            <FollowDropDown
              title = {"following"}
              users = {this.state.following}
              updateProfileUID = {this.updateProfileUID}
            />
          </div>



          {this.state.isUsersProfile
            ? (
              <div>
              
                <ImageUpload setImageState = {this.setImageState}/>
                <img src = {this.state.profilePhoto} className = "profilePhoto"/>

                Username (click to edit, one word only):
                <RIEInput
                  value={this.state.username}
                  change={this.sendUpdatedUserDataToDB}
                  propName="text"
                  validate={this.isStringAcceptable}
                  classLoading="loading"
                  classInvalid="invalid"
                />
                Bio (click to edit):
                <RIETextArea
                  value={this.state.bio}
                  change={this.sendUpdatedUserDataToDB}
                  propName="textarea"
                  validate={this.isStringAcceptable}
                  classLoading="loading"
                  classInvalid="invalid"
                />
              </div>
            ) : (
              <div>
                <h5> 
                  bio: {this.state.bio}
                </h5> 
                <br /> 
                <h5> 
                  Username: {this.state.username}
                </h5> 
              </div>
            )
          }

          <FavoriteCategories favoriteCategories={this.state.favoriteCategories} />
       </div>
    )
  }
}
