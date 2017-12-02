import React from 'react';
import firebase from 'firebase';
import { firebaseAuth } from '../../../config/firebaseCredentials'

// this is getting called by the profile

export default class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }; 
  }

  render() {
    return (
      <div>
        This is the Follow Button (should only show up when looking at some other users profile)
      </div> 
    )
  }
}