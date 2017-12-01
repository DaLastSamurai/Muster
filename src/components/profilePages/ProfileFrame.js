import React from 'react';
import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'

// this profile is always called by a route in the form /profile/:uid
// 

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser : , 
      profileUID : 
    }; 
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  // this needs to query the database every time. 

  componentDidMount() { 
    this.setState({})
  }



  handleEmailSubmit(e) {

  }



  render() {
    return 
    return (
      <div>
        This is the profile frame. 
      </div> 
    )

  }
}