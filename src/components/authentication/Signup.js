import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials'
// import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
// import ResetPassword from './ResetPassword'
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
    this.saveUser = this.saveUser.bind(this)
  }

  componentDidMount() { 
  
  }

  handleEmailSubmit(e) {
    e.preventDefault()
    console.log('state', this.state)
    console.log('these are the email and pw', this.state.email.value, this.state.pw.value)
    return firebaseAuth().createUserWithEmailAndPassword(this.state.email.value, this.state.pw.value)
      .then(this.saveUser)
      .catch(error => this.setState({error : error.toString()}))
  }

  saveUser(user) { // eventually send this to store (REDUX) from login. 
    return userRef.child(`${user.uid}/info`)
    .set({
      // TODO: add to this to account for users signing up with a dif method
      email: user.email,
      uid: user.uid
    })
  }

  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <h1> Sign Up </h1>
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