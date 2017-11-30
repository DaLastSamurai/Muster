import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { provider } from '../../../config/firebaseAuthCredentials'
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

  handleGoogleSubmit(e) {
    e.preventDefault(); 
    firebaseAuth().signInWithRedirect(provider)
      .then(function(result) {
        console.log('this is the result of signing in with google: ', result)
      })
      .catch(function(error) {
        this.setState({error: error.toString()})
      });

  }

  handleEmailSubmit(e) {
    e.preventDefault(); 
    // console.log('this is email and password in handleEmailSubmit: ', `\n ${this.state.email.value}`, `\n ${this.state.pw.value}`)

    // these are being retrieved from the form with thier refs. 
    firebaseAuth()
      .signInWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .catch(error => this.setState({error: error.toString()}))

  }

  render() {
    // console.log('this is the provider', provider)
    // console.log('these are the props from authFrame', this.props)
    return (
      <div className="col-sm-6 col-sm-offset-4">
        <h1> Login </h1>
        
        {/* This is the google authentication: */}
        <form onSubmit={this.handleGoogleSubmit}>
          <button type="submit" className="btn btn-primary">Login With Google</button>
        </form>

        {/* This is the email auth*/}
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
            <div>  
              <Link to="/resetPassword">
                <LinkButton title='resetPassword' clickFunction={() => {}}/>
              </Link>
              <LinkButton title='Signup Page' clickFunction={this.props.loadSignupPage}/>
              <Route exact path="/resetPassword" 
                render={() => <ResetPassword />} 
              />
            </div>
        </div> 
      </div> 
    )
  }
}