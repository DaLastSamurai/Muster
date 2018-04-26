import React, {Component} from 'react';
import {firebaseAuth} from '../../../config/firebaseCredentials'
import LoadingIcon from "../helperElements/LoadingIcon";

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: "", // misnomer, also shows the success response.
      email: "",
    };
    this.resetPassword = this.resetPassword.bind(this)
  }

  componentWillReceiveProps({email}) {
    if (typeof email === 'string' || email === '') {
      this.setState({email}, this.setState({loading: false}))
    }
  }

  resetPassword(e) {
    e.preventDefault();
    firebaseAuth().sendPasswordResetEmail(this.state.email)
      .then(() => this.setState({
        error:
          `Password reset email sent to ${this.state.email}.`
      }))
      .catch(() => this.setState({
        error:
          `Email Address ${this.state.email} not found`
      }))
  }

  render() {
    return this.state.loading
      ? <LoadingIcon/>
      : (
        <div className="resetpass-form-box">
          <form onSubmit={this.resetPassword}>
            <div className="form-group">
              <input type='text'
                     className="form-control"
                     onChange={(e) => this.setState({email: e.target.value})}
                     value={this.state.email}
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