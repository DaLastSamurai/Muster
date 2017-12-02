import React from 'react';
import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'
// this profile is always called by a route in the form /profile/:uid

export default class ProfileFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebase.auth().currentUser.uid, 
      // this could either be the profileUID of some user, or the 
      // profile UID of the current logged in user. 
      profileUID: this.props.match.params.uid, 
      // this is boolean that is true when the user that is on the profile page
      // is the user that is currently logged in. If true, the user can edit the profile. 
      isUsersProfile: firebase.auth().currentUser.uid === this.props.match.params.uid, 

      // these are all just user fields:
      // these are the fields that will be handled by the text to 
      bio: null, 
      username: null, 
      profileUrl: null, 

      // handles the social: 
      following: null, 
      followers: null, 

      // this is passed down. 
      favoriteCategories: null, 
    }; 
    this.handleUserDataRendering = this.handleUserDataRendering.bind(this)
    this.sendNewUserData = this.sendNewUserData.bind(this)
  }

  componentWillMount() {
    handleUserDataRendering()
  }

  handleUserDataRendering(fieldsToRerender = []) {
    // takes in an array of fields to Rerender and then rerenders those
    // recursively calls each element in the array and renders it. 
    if (fieldsToRerender.length === 0) {return}


  }

  sendNewUserData(fieldToSend, cb) {
    // takes in a string that is the field that needs to be 

    this.setState({})

    // this callback calls handleUserDataRendering and thus takes an array of
    cb([fieldToSend]) 
  }


  render() {
    // console.log('this is the props', this.props)
    console.log('this is the state', this.state)
    // console.log('this is the user information',  )
    return (
      <div>
        {this.state.isUsersProfile ? <FollowButton /> : <div /> }
        <FollowersDropDown /> 
        <FollowingDropDown /> 
        {this.state.isUsersProfile 
          ? (
            <div> 

              This is where all of the editable text fields will go. 

            </div>
          ) : (
            <div> 

              This is where all of the non-editable text fields will go. 

            </div>
          )
        }
        {/* this is going to look like the bespintrest (hopefully) */}
        <FavoriteCategories favoriteCategories={this.state.favoriteCategories} /> 
      </div> 
    )
  }
}










