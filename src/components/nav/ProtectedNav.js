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

import ChatRoomList from '../messaging/ChatRoomList'

export default class ProtectedNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    console.log(this.props.user)
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
                <a className="nav-link" title='library' clickFunction={() => { }} >library</a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link to={'/addItems'}>
                <a className="nav-link" title='add' clickFucntion={() => { }}>add</a>
              </Link>           
            </li>

            <li className="nav-item dropdown">
              <Link to='/trade'>
                <a className="nav-link" title='trade' clickFunction={() => { }}>trade</a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link to="/">
                <a className="nav-link" title='Logout' clickFunction={() => { firebaseAuth().signOut() }} >logout</a>
              </Link>
            </li>

          </ul>
        </nav>

        <div>
          <Link to={`/profile/${this.props.user.uid}`}>
            <UserInfo user={this.props.user} title="Profile" clickFunction={() => { window.location.reload() }} />
          </Link>
        </div>

      </nav>
    )
  }
}
