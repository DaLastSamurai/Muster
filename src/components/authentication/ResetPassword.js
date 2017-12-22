import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

export default class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      error : "", // misnomer, also shows the success response. 
      email : "",
    }; 
    this.resetPassword = this.resetPassword.bind(this)
  }

  resetPassword(e) {
    e.preventDefault(); 
    firebaseAuth().sendPasswordResetEmail(this.state.email.value)
      .then(() => this.setState({error : 
        `Password reset email sent to ${this.state.email.value}.`}))
      .catch(() => this.setState({error : 
        `Email Address ${this.state.email.value} not found`}))
  }

  render() {
    return (
      <div className="resetpass-form-box">
        <form onSubmit={this.resetPassword}>
          <div className="form-group">
            <input type='text'
              className="form-control" 
              ref={(email) => this.state.email = email} 
              placeholder="Enter Your Email To Reset Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Me Reset Password Instructions
          </button>
        </form>
        <div>
          {this.state.error}
        </div> 
      </div> 
    )
  }
}