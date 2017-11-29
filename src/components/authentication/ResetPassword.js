import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

export default class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      error : "", 
      email : "", 
    }; 
    this.resetPassword = this.resetPassword.bind(this)
  }

  resetPassword() {
    firebaseAuth().sendPasswordResetEmail(this.state.email.value)
      .then(() => this.setState({error : `Password reset email sent to ${this.state.email.value}.`}))
      .catch(() => this.setState({error : `Email Address ${this.state.email.value} not found`}))
  }

  render() {
    return (
      <div className="">
        <form onSubmit={this.resetPassword}>
          <div className="form-group">
            <input className="form-control" ref={(email) => this.state.email = email} placeholder="Enter Your Email To Reset Password"/>
          </div>
          <button type="submit" className="btn btn-primary">Send Me Reset Password Instructions</button>
        </form>
        <div>
          {this.state.error}
        </div> 
      </div> 
    )
  }
}