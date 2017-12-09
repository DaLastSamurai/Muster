import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
import { provider } from '../../../config/firebaseAuthCredentials'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import ResetPassword from './ResetPassword'
import Signup from './Signup'
import LinkButton from '../helperElements/LinkButton'
import LoadingIcon from '../helperElements/LoadingIcon'

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
  }

  handleGoogleSubmit(e) {
    e.preventDefault(); 
    firebaseAuth().signInWithRedirect(provider)
      .then(function(result) {
        // console.log('this is the result of signing in with google: ', result)
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
      .then(() => {this.setState({loading : true})})
      .catch(error => this.setState({error: error.toString()}))
  }

  render() {
    // console.log('this is the state', this.state.loading)
    // console.log('these are the props from authFrame', this.props)
    return (
      <div className="col-sm-6 col-sm-offset-4">
        <h1> Login </h1>
        
        {/* This is the google authentication: */}
        <form onSubmit={this.handleGoogleSubmit}>
          <LinkButton type={"submit"} title='Login With Google' clickFunction={() => {} } />
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
          {!this.state.resettingPW 
            ? (<LinkButton title='Reset Password' clickFunction={() => { this.setState({resettingPW : true}) } }/>)
            : (<ResetPassword />)
          }
          <LinkButton title='Signup Page' clickFunction={this.props.loadSignupPage}/>
        </div> 
      </div> 
    )
  }
}




