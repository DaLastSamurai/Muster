import React from 'react';
import firebase from 'firebase';
import {OAUTH_Key, HASHED_PASS} from '../../../config/firebaseAuthCredentials'
import GoogleLogin from 'react-google-login'
import {firebaseAuth} from '../../../config/firebaseCredentials'
import LinkButton from '../helperElements/LinkButton'

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
      email: "",
      pw: "",
    };
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  handleEmailSubmit(e) {
    e.preventDefault()
    return firebaseAuth().createUserWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .catch(error => this.setState({error: error.toString()}))
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-4">
        <div className="login-form-container">
          <h1> Sign Up </h1>
          <form onSubmit={this.handleEmailSubmit}>
            <div className="form-group">
              <h4>Email</h4>
              <input type='email' className="form-control" ref={(email) => this.state.email = email}
                     placeholder="Your Email Address"/>
            </div>
            <div className="form-group">
              <h4>Password</h4>
              <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.state.pw = pw}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            <div className="signuppg-button">
              {this.state.error}
              <LinkButton title='Login Page' clickFunction={this.props.loadLoginPage}/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}