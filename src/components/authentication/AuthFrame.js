import React from 'react';
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
    // these props come down from the app.js and are toggled by clicking the 
    // 'login' button in the unprotected nav. 
    this.setState({isSigningUp : this.props.isSigningUp})
  }

  loadSignupPage() {
    this.setState({isSigningUp: true})
  }

  loadLoginPage() {
    this.setState({isSigningUp: false})
  }

  render() {
    return this.state.isSigningUp 
    ? (<Signup loadLoginPage = {this.loadLoginPage} />) 
    : (<Login user = {this.props.user} loadSignupPage = {this.loadSignupPage}/>)
  }
}

