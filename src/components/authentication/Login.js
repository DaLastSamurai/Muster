import React from 'react';
import {firebaseAuth} from '../../../config/firebaseCredentials'
import {OAUTH_Key, HASHED_PASS} from '../../../config/firebaseAuthCredentials'
import GoogleLogin from 'react-google-login'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import ResetPassword from './ResetPassword'
import LinkButton from '../helperElements/LinkButton'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      emailForPasswordReset: "",
      email: "",
      pw: "",
      resettingPW: false,
      loading: false,
    };
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.emptyFormFields = this.emptyFormFields.bind(this);
  }

  handleEmailSubmit(e) {
    e.preventDefault();
    // these are being retrieved from the form with thier refs. 
    firebaseAuth()
      .signInWithEmailAndPassword(this.state.email, this.state.pw)
      .then(() => {
        this.setState({loading: true})
      })
      .catch(({ message }) => {
        let error = message.toString().replace(' or the user does not have a password', '');
        this.setState({ error })
      })
  }

  emptyFormFields() {
    this.setState({emailForPasswordReset : this.state.email}, () => {
      let error, email, pw;
      error = email = pw = "";
      this.setState({error, email, pw})
    });
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-4">
        <div className="login-form-container">
          <h1> Login </h1>
          {/* This is the email auth*/}
          <form onSubmit={this.handleEmailSubmit}>
            <div className="form-group">
              <h4>Email</h4>
              <input type="email" className="form-control"
                     onChange={(e) => this.setState({email : e.target.value})}
                     placeholder="Your Email Address"
                     value={this.state.email}
              />
            </div>
            <div className="form-group">
              <h4>Password</h4>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => this.setState({pw : e.target.value})}
                value={this.state.pw}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <div className="loginpg-button">
            {this.state.error}
            {!this.state.resettingPW
              ? (<LinkButton title='Reset Password' clickFunction={() => {
                this.setState({resettingPW: true}, this.emptyFormFields)
              }}/>)
              : (<ResetPassword email={this.state.emailForPasswordReset}/>)
            }
            <LinkButton title='Signup Page' clickFunction={this.props.loadSignupPage}/>
          </div>
        </div>
      </div>
    )
  }
}




