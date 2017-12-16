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

export default class ProtectedNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <nav>
        <div  className="navbar">
          <Link to="/">
            <Logo />
          </Link>
          <ul className="content">
            <Link to={`/profile/${this.props.user.uid}`}>
              <LinkButton title='Profile' clickFunction={() => {window.location.reload()}} />
            </Link>
            <Link to='/manageinventory'>
              <LinkButton title='Manage Inventory' clickFunction={() => { }} />
            </Link>
            <Link to='/trade'>
              <LinkButton title='Trade' clickFunction={() => { }} />
            </Link>
            <Link to="/">
              <LinkButton title='Logout' clickFunction={() => {firebaseAuth().signOut()}} />
            </Link>
          </ul>
        </div>

        <div className="search">
        <Link to="/searching">
          <SearchHits/>
        </Link>
          <SearchToggler searchBy={this.props.searchBy}/>
        </div>
      </nav>
    )
  }
}
