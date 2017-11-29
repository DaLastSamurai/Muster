import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import ResetPassword from './ResetPassword'
import Signup from './Signup'
import LinkButton from '../helperElements/LinkButton'

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error : "", 
      email : "", 
      pw : "", 
    }; 
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  componentDidMount() { 
  
  }

  handleEmailSubmit(e) {
    e.preventDefault(); 
    console.log('this is email and password in handleEmailSubmit: ', `\n ${this.state.email.value}`, `\n ${this.state.pw.value}`)

    // these are being retrieved from the form with thier refs. 
    firebaseAuth()
      .signInWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .catch(error => this.setState({error: error.toString()}))
  }

  render() {
    // console.log('these are the props from authFrame', this.props)
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <h1> Login </h1>
        <form onSubmit={this.handleEmailSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.state.email = email} placeholder="Your Email Address"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.state.pw = pw} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div>
          {this.state.error} 
          <Router> 
            <div>  
              <Link to="/resetPassword">
                <LinkButton title='resetPassword' clickFunction={() => {}}/>
              </Link>
              <LinkButton title='Signup Page' clickFunction={this.props.loadSignupPage}/>
              <Route exact path="/resetPassword" 
                render={() => <ResetPassword />} 
              />
            </div>
          </Router> 
        </div> 
      </div> 
    )
  }
}