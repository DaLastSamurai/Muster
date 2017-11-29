import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {

    }; 
  }

  componentDidMount() { 
  
  }

  loginWithEmail(email, pw) {
    firebaseAuth().signInWithEmailAndPassword(email, pw)
  }

  saveUser(user) {
    return userRef.child(`${user.uid}/info`)
    .set({
      // TODO: add to this to account for users signing up with a dif method
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
  }

  resetPassword() {
    
  }


  render() {
    return (
      <div> This is the Login Page </div> 




      
    )
  }
}