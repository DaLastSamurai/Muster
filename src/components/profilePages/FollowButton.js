import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users } from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'

// this is getting called by the profile

export default class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing : null
    }; 
    this.followButtonHandler = this.followButtonHandler.bind(this)
  }

  componentWillMount() {
    this.getFollowInfo()
  }

  getFollowInfo() {
    let isFollowing = this.props.following.includes(this.props.profileUID); 
    this.setState({isFollowing})
  }

  followButtonHandler() {
    // takes in a request to follow a given user by another user and writes that 
    // request to the db. Fix any prop issues by recalling the db. 
    let dbRoute = `${this.props.profileUID}/profileInfo/following`
    firebase.database().ref('users/' + dbRoute).on('value', (snapshot) => {
      let currentlyFollowing = snapshot.val()
      if (!(snapshot.val().includes(this.props.profileUID))) {
        currentlyFollowing.push(this.props.profileUID)
        let update = {}; 
        update[dbRoute] = currentlyFollowing; 
        users.update(update)
        this.setState({isFollowing : true})
      }
    })
  }

  render() {
    return this.state.isFollowing ? (
      <div>
        <LinkButton title='Already Following' clickFunction={() => {}} />
      </div> 
    ) : (
      <div>
        <LinkButton title='Follow' clickFunction={() => {this.followButtonHandler()}} />
      </div> 
    )
  }
}