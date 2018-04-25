import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users} from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'
// this is getting called by the profile

export default class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: null, 

    }; 
    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  componentWillMount() {
    this.getFollowInfo()
  }

  getFollowInfo() {
    let curUid = firebaseAuth().currentUser.uid
    let userFollowersPath = `users/${curUid}/profileInfo/following`
    firebase.database().ref(userFollowersPath).on('value', users => {
      // if curUser isn't following anyone (users.val() is null) set isFollowing
      // to false. 
      if (!users.val()) {
        this.setState({isFollowing : false})
      } else {
        let followingUsers = Object.keys(users.val())
        let isFollowing = followingUsers.includes(this.props.profileUID)
        this.setState({isFollowing})
      }
    })
  }

  handleFollow() {
    // takes in a request to follow a given user by another user and writes that 
    // request to the db. 
    let curUser = firebaseAuth().currentUser.uid

    let beingFollowedPath = `users/${this.props.profileUID}/profileInfo/followers/${curUser}`
    let followingPath = `users/${curUser}/profileInfo/following/${this.props.profileUID}`
    let followObj = {}
    followObj['addedOn'] = Date.now()
    // add any information you want to add to the followObj here. 
    firebase.database().ref(beingFollowedPath).set(followObj)
    firebase.database().ref(followingPath).set(followObj)
  }

  handleUnfollow() {
    // 1. remove the user from profileUID followers
    // 2. remove the user from this.firebaseAuth().currentUser's following. 
    let curUser = firebaseAuth().currentUser.uid
    
    // remove the user from this.firebaseAuth().currentUser's following. 
    users.child(curUser).child('profileInfo').child('following')
         .child(this.props.profileUID).remove()

    // remove the user from profileUID followers
    users.child(this.props.profileUID).child('profileInfo').child('followers')
         .child(curUser).remove()
  }

  render() {
    // console.log('this is the props in follow button', this.props)
    return this.state.isFollowing 
    ? (
      <div className="follow-button">
        <button>
        <LinkButton title='Unfollow' clickFunction={this.handleUnfollow} />
        </button>
      </div> 
    ) : (
      <div className="follow-button">
        <button>
        <LinkButton title='Follow' clickFunction={this.handleFollow} />
        </button>
      </div> 
    )
  }
}

