// This navbar will show up when the user is logged in.
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
// import SearchBar from '../helperElements/SearchBar'
import AuthFrame from '../authentication/AuthFrame'

import {InstantSearch, SearchBox} from 'react-instantsearch/dom';
import { SearchHits } from '../helperElements/Search.jsx'

export default class ProtectedNav extends React.Component {
  constructor() {
    super();
    this.state = {};

  }

  render() {
    return (
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav navbar-legt">
                <li className="logo"><Logo />
                </li>

                <li className="popularcategory">
                  <Link to="/">
                    <LinkButton title='Home' clickFunction={() => {}}/>
                  </Link>
                </li>

                <li className="link-button">
                  <Link to={`/profile/${this.props.user.uid}`}>
                    <LinkButton title='Profile' clickFunction={() => {window.location.reload()}} />
                  </Link>
                </li>

                <li className="manageinventory">
                  <Link to='/manageinventory'>
                    <LinkButton title='Manage Inventory' clickFunction={() => { }} />
                  </Link>
                </li>

                <li className="link-button">
                  <Link to="/">
                    <LinkButton title='Logout' clickFunction={() => {firebaseAuth().signOut()}} />
                  </Link>
                </li>

              </ul>
              {/*<ul className="nav navbar-nav">
                <li className="navbar-text navbar-center align-top search-bar">
                  <SearchBar search={(input) => {console.log(`you searched: ${input}, but this search function doesnt do shit`)}}/>
                </li>
              </ul>*/}
              <li style={{float: "right"}}>
              <Link to="/searching">
                <SearchHits/>
              </Link>
              </li>

            </div>
          </nav>
        </div>
    )
  }
}
