import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth } from '../../config/firebaseCredentials';
import UnprotectedNav from './nav/UnprotectedNav';
import ProtectedNav from './nav/ProtectedNav';
import PopularCategoryList from './popularcategory/PopularCategoryList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false, 
      user: null,  
    }; 
    this.checkAuthStatus = this.checkAuthStatus.bind(this); 
  }

  componentDidMount() { 
    this.checkAuthStatus()
  }

  checkAuthStatus() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed : true, 
          user: user, 
        })
      } else {
        this.setState({
          authed : false, 
          user : null, 
        })
      }
    }) 
  }

  render() {
    return (
      <div>
        {this.state.authed  ? (<ProtectedNav user={this.state.user} />) : (<UnprotectedNav />)}
        <PopularCategoryList />
      </div>
    )
  }
}