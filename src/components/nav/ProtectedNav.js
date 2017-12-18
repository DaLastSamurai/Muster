// This navbar will show up when the user is logged in.
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
import AuthFrame from '../authentication/AuthFrame'

import {InstantSearch, SearchBox} from 'react-instantsearch/dom';
import { SearchHits } from '../helperElements/Search.jsx'
import SearchToggler from '../helperElements/SearchToggler.jsx'
import UserInfo from '../userBar/UserInfo.jsx';


export default class ProtectedNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    console.log(this.props.user)
    return (
      <div className="protectednavbar-container">


        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="navbar-search">
          <Link to="/searching">
            <SearchHits />
          </Link>
          {/* <SearchToggler searchBy={this.props.searchBy} /> */}
        </div>

        <div className="navbar-links">
          <Link to='/manageinventory'>
            <button title='Books' clickFunction={() => { }} >Books</button>
          </Link>
          <Link to='/trade'>
            <button title='Trade' clickFunction={() => { }}>Trade</button>
          </Link>
          <Link to={'/addItems/'}>
            <button type="button" className="">Add</button>
          </Link>
          <Link to="/">
            <button title='Logout' clickFunction={() => { firebaseAuth().signOut() }} >Logout</button>
          </Link>
          {/* <Link to={`/profile/${this.props.user.uid}`}>
            <img src={"https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"} title='Profile' clickFunction={() => {window.location.reload()}} />
          </Link> */}
        </div>
{/*           
        <div className="navbar-links">
          <Link to={`/profile/${this.props.user.uid}`}>
            <LinkButton title='Profile' clickFunction={() => {window.location.reload()}} />
          </Link>
          <Link to='/manageinventory'>
            <button title='Books' clickFunction={() => { }} >Books</button>
          </Link>
          <Link to='/trade'>
            <button title='Trade' clickFunction={() => { }}>Trade</button>
          </Link>
          <Link to={'/addItems/'}>
            <button type="button" className="">Add</button>
          </Link>
          <Link to="/">
          <button title='Logout' clickFunction={() => { firebaseAuth().signOut() }} >Logout</button>
          </Link>
        </div> */}

        <div className="navbar-avatar">
          <Link to={`/profile/${this.props.user.uid}`}>
            <UserInfo user={this.props.user} title="Profile" clickFunction={() => {window.location.reload()}} />
          </Link>
        </div>
        
      </div>
    )
  }
}
