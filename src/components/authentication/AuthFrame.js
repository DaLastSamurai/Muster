import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect, Route } from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Signup from './Signup'
import Login from './Login'

export default class AuthFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      isSigningUp: false, // this will load the login page by default. 
    }; 
    this.loadSignupPage = this.loadSignupPage.bind(this); 
    this.loadLoginPage = this.loadLoginPage.bind(this);
  }

  componentDidMount() { 
    
  }

  loadSignupPage() {
    this.setState({isSigningUp: true})
  }

  loadLoginPage() {
    this.setState({isSigningUp: false})
  }

// The user will have the option of rendering
  render() {
    return this.state.isSigningUp 
    ? (<Signup loadLoginPage = {this.loadLoginPage} />) 
    : (<Login user = {this.props.user} loadSignupPage = {this.loadSignupPage}/>)
  }
}
