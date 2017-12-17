// This navbar will show up when the user is not logged in. 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'

export default class Logo extends React.Component {
  constructor() {
    super();
    this.state = {

    }; 

  }

  componentDidMount() { 

  }

  render() {
    return (
      <h1 className='navbar-logo'>mustr.</h1>
    )
  }
}