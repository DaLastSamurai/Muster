import React from 'react';
import firebase from 'firebase';
import { provider } from '../../../config/firebaseAuthCredentials'
import { firebaseAuth } from '../../../config/firebaseCredentials'
// import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
import LinkButton from '../helperElements/LinkButton'

export default class Signup extends React.Component {
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
        // console.log('this is the result of signing in with google: ', result)
      })
      .catch(function(error) {
        this.setState({error: error.toString()})
      });
  }


  handleEmailSubmit(e) {
    e.preventDefault()
    return firebaseAuth().createUserWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .catch(error => this.setState({error : error.toString()}))
  }



  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <h1> Sign Up </h1>
          {/* This is the google authentication: */}
          <form onSubmit={this.handleGoogleSubmit}>
            <LinkButton type={"submit"} title='Signup With Google' clickFunction={() => {} } />
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
          <button type="submit" className="btn btn-primary">Sign Up</button>
        <div>
          {this.state.error}   
          <LinkButton title='Login Page' clickFunction={this.props.loadLoginPage}/>
        </div> 
        </form>
      </div> 
    )
  }
}