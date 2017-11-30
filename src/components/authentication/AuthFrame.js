import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect, Route } from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Signup from './Signup'
import Login from './Login'

export default class AuthFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: this.props.isSigningUp,// this will load the login page by default.
      loading: false, 
    }; 
    this.loadSignupPage = this.loadSignupPage.bind(this); 
    this.loadLoginPage = this.loadLoginPage.bind(this);
    this.showLoadingIcon = this.showLoadingIcon.bind(this); 
  }

  componentWillReceiveProps() {
    this.setState({isSigningUp : this.props.isSigningUp})
  }

  loadSignupPage() {
    this.setState({isSigningUp: true})
  }

  loadLoginPage() {
    this.setState({isSigningUp: false})
  }

  showLoadingIcon() {
    this.setState({loading : true})
  }

  render() {
    return this.state.isSigningUp 
    ? (<Signup loadLoginPage = {this.loadLoginPage} showLoadingIcon = {this.showLoadingIcon} loading = {this.state.loading}  />) 
    : (<Login user = {this.props.user} loadSignupPage = {this.loadSignupPage}/>)
  }
}
