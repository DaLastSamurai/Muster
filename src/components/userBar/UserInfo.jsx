import React from 'react';
import firebase from 'firebase'
import LinkButton from '../helperElements/LinkButton'
// need to change so that clicking on takes you to the profile page of the user
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'


export default class UserInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {}; 
    this.fetchProfilePhotoAndUsername = this.fetchProfilePhotoAndUsername.bind(this)
  }

  componentDidMount() {
    this.fetchProfilePhotoAndUsername()
  }

  fetchProfilePhotoAndUsername() {
    let dbRoute = `users/${this.props.user.uid}/profileInfo/`;
    firebase.database().ref(dbRoute).on('value', (snapshot) => {
      this.setState(snapshot.val())
    })
  }

  render() {
    return (
      <div>
        <img src={this.state.profilePhoto} />
        <Link to={`/profile/${this.props.user.uid}`}>
          <LinkButton title={this.state.username} clickFunction={() => {window.location.reload()}} />
        </Link>
      </div>
    )
  }
}
