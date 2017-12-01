import React from 'react';
import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'

// this profile is always called by a route in the form /profile/:uid
// 

export default class ProfileFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser : , 
      // profileUID :  
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
    console.log(this.props)
    return (
      <div>
        This is the profile frame. 
      </div> 
    )
  }
}