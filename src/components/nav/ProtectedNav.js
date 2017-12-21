// This navbar will show up when the user is logged in.
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
import AuthFrame from '../authentication/AuthFrame'
import firebase from 'firebase'
import {InstantSearch, SearchBox} from 'react-instantsearch/dom';
import { SearchHits } from '../helperElements/Search.jsx'
import SearchToggler from '../helperElements/SearchToggler.jsx'
import UserInfo from '../userBar/UserInfo.jsx';

import ChatRoomList from '../messaging/ChatRoomList'

export default class ProtectedNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.signOutUser = async () => {
      try {
        console.log('this is getting run')
          await firebase.auth().signOut();
          window.location.reload()
      } catch (e) {
          console.log(e);
      }
    }

  }

  render() {
    return (
      <nav className="protectednavbar-container">


        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-search-container">
          <div>
            <Link to="/searching">
              <SearchHits />
            </Link>
            {/* <SearchToggler searchBy={this.props.searchBy} /> */}
          </div>
        </div>


        <nav role="navigation" className="nav" className="navbar-links">
          <ul className="nav-items">
            <li className="nav-item dropdown">
              <Link to='/manageinventory'>
                <a className="nav-link" title='library' >library</a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link to={'/addItems'}>
                <a className="nav-link" title='add'>add</a>
              </Link>           
            </li>

            <li className="nav-item dropdown">
              <Link to='/trade'>
                <a className="nav-link" title='trade' >trade</a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link to="/">
                <a className="nav-link" title='Logout' onClick={this.signOutUser}>logout</a>
              </Link>
            </li>

          </ul>
        </nav>

        <div>
          <Link to={`/profile/${this.props.user.uid}`}>
            <div onClick={() => { window.location.reload() }}> 
              <UserInfo user={this.props.user} title="Profile"  />
            </div> 
          </Link>
        </div>

      </nav>
    )
  }
}
