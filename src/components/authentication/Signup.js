import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {

    }; 
  }

  componentDidMount() { 
  
  }

  signupWithEmail(email, pw) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
      .then(saveUser)
  }

  saveUser(user) { // eventually send this to store (REDUX) from login. 
    return userRef.child(`${user.uid}/info`)
    .set({
      // TODO: add to this to account for users signing up with a dif method
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
  }

  render() {
    return (
      <div> This is the Signup Page </div> 
    )
  }
}