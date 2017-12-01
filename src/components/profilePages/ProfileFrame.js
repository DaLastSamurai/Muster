import React from 'react';
import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'

// this profile is always called by a route in the form /profile/:uid
// 

export default class ProfileFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.match.params.curUser, 
      // this could either be the profileUID of some user, or the 
      // profile UID of the current logged in user. 
      profileUID: this.props.match.params.uid, 
      // this is boolean that is true when the user that is on the profile page
      // is the user that is currently logged in. 
      isUsersProfile: this.props.match.params.curUser === this.props.match.params.uid
    }; 
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  // this needs to query the database every time. 

  componentWillReceiveProps() { 
    this.setState({currentUser : this.props})
  }



  handleEmailSubmit(e) {

  }



  render() {
    console.log('this is the props', this.props)
    console.log('this is the state', this.state)
    return (
      <div>
        This is the profile frame. 
      </div> 
    )
  }
}