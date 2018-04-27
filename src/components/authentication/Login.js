import React from 'react';
import {firebaseAuth} from '../../../config/firebaseCredentials'
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
      isSigningUp: false,
      resettingPW: false,
      loading: false,
    };
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.emptyFormFields = this.emptyFormFields.bind(this);
  }

  componentWillReceiveProps({isSigningUp}) {
    this.setState({isSigningUp})
  }

  handleEmailSubmit(e) {
    e.preventDefault();
    let authPromise = this.state.isSigningUp
      ? firebaseAuth().createUserWithEmailAndPassword(this.state.email, this.state.pw)
      : firebaseAuth().signInWithEmailAndPassword(this.state.email, this.state.pw);

    authPromise
      .then(() => this.setState({loading: true}))
      .catch(() => {
        let error = message.toString().replace(' or the user does not have a password', '');
        this.setState({error})
      });
  }

  emptyFormFields() {
    this.setState({emailForPasswordReset: this.state.email}, () => {
      let error, email, pw;
      error = email = pw = "";
      this.setState({error, email, pw})
    });
  }

  handleLinkButton() {
    return (
      this.state.isSigningUp
        ? <LinkButton title='Login Page' clickFunction={() => this.setState({isSigningUp: false})}/>
        : <LinkButton title='Signup Page' clickFunction={() => this.setState({isSigningUp: true})}/>
    )
  }

  handleResetPassword() {
    let {resettingPW, isSigningUp, emailForPasswordReset} = this.state;
    return (
      resettingPW
        ? <ResetPassword email={emailForPasswordReset}/>
        : !isSigningUp &&
        <LinkButton
          title='Reset Password' clickFunction={() =>
            this.setState({resettingPW: true}, this.emptyFormFields)
        }/>
    )
  }

  render() {
    let {isSigningUp} = this.state;
    let page = isSigningUp ? 'Sign Up' : 'Login';
    return (
      <div className="col-sm-6 col-sm-offset-4">
        <div className="login-form-container">
          <h1>{page}</h1>
          {/* This is the email auth*/}
          <form onSubmit={this.handleEmailSubmit}>
            <div className="form-group">
              <h4>Email</h4>
              <input type="email" className="form-control"
                     onChange={(e) => this.setState({email: e.target.value})}
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
                onChange={(e) => this.setState({pw: e.target.value})}
                value={this.state.pw}
              />
            </div>
            <button type="submit" className="btn btn-primary">{page}</button>
          </form>
          <div className="loginpg-button">
            {this.state.error}
            {this.handleResetPassword()}
            {this.handleLinkButton()}
          </div>
        </div>
      </div>
    )
  }
}

