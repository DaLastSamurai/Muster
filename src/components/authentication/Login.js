import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { OAUTH_Key, HASHED_PASS } from '../../../config/firebaseAuthCredentials'
import GoogleLogin  from 'react-google-login'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import ResetPassword from './ResetPassword'
import Signup from './Signup'
import LinkButton from '../helperElements/LinkButton'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error : "", 
      email : "", 
      pw : "", 
      resettingPW: false, 
      loading: false, 
    }; 
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
    this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this)
  }

  handleGoogleSubmit(res) {
    firebaseAuth()
      .signInWithEmailAndPassword(res.profileObj.email, HASHED_PASS)
      .then(() => {this.setState({loading : true})})
      .catch(error => this.setState({error: error.toString()}))
  }

  handleEmailSubmit(e) {
    e.preventDefault(); 
    // these are being retrieved from the form with thier refs. 
    firebaseAuth()
      .signInWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .then(() => {this.setState({loading : true})})
      .catch(error => this.setState({error: error.toString()}))
  }

  render() {
      const responseGoogle = (response) => {
          console.log(response);
      }
    // console.log('this is the state', this.state.loading)
    // console.log('these are the props from authFrame', this.props)
    return (
      <div className="col-sm-6 col-sm-offset-4">
      <div className="login-form-container">
        <h1> Login </h1>
        
        {/* This is the google authentication: */}
        <div>
          <GoogleLogin 
            clientId="725434233122-7silvg3edd82c818tqko0o5sjk1tmdtq.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={this.handleGoogleSubmit}
            onFailure={() => console.log('There is an error in the google login!')}
          />
        </div>

        {/* This is the email auth*/}
        <form onSubmit={this.handleEmailSubmit}>
          <div className="form-group">
            <h4>Email</h4>
            <input type="email" className="form-control" ref={(email) => this.state.email = email} placeholder="Your Email Address"/>
          </div>
          <div className="form-group">
            <h4>Password</h4>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.state.pw = pw} />
          </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className="loginpg-button">
          {this.state.error} 
          {!this.state.resettingPW 
            ? (<LinkButton title='Reset Password' clickFunction={() => { this.setState({resettingPW : true}) } }/>)
            : (<ResetPassword />)
          }
          <LinkButton title='Signup Page' clickFunction={this.props.loadSignupPage}/>
        </div> 
        </div>
      </div> 
    )
  }
}




