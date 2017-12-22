import React from 'react';
import firebase from 'firebase';
import { OAUTH_Key, HASHED_PASS } from '../../../config/firebaseAuthCredentials'
import GoogleLogin  from 'react-google-login'
import { firebaseAuth } from '../../../config/firebaseCredentials'
// import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
import LinkButton from '../helperElements/LinkButton'

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error : "", 
      email : "", 
      pw : "", 
    }; 
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  handleGoogleSubmit(res) {
    console.log('this is the response from the signup: ', res.profileObj.email, HASHED_PASS)
    firebaseAuth()
      .signInWithEmailAndPassword(res.profileObj.email, HASHED_PASS)
      .then(() => {this.setState({loading : true})})
      .catch(error => this.setState({error: error.toString()}))
  }


  handleEmailSubmit(e) {
    e.preventDefault()
    return firebaseAuth().createUserWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .catch(error => this.setState({error : error.toString()}))
  }



  render() {
    return (
      <div className="col-sm-6 col-sm-offset-4">
      <div className="login-form-container">
        <h1> Sign Up </h1>
          {/* This is the google authentication: */}
          <div> 
            <GoogleLogin 
              clientId="725434233122-7silvg3edd82c818tqko0o5sjk1tmdtq.apps.googleusercontent.com"
              buttonText="Signup With Google"
              onSuccess={this.handleGoogleSubmit}
              onFailure={() => console.log('There is an error in the google signup!')}
            />
          </div> 

          {/* This is the email auth*/}

        <form onSubmit={this.handleEmailSubmit}>
          <div className="form-group">
            <h4>Email</h4>
            <input type='email' className="form-control" ref={(email) => this.state.email = email} placeholder="Your Email Address"/>
          </div>
          <div className="form-group">
            <h4>Password</h4>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.state.pw = pw} />
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