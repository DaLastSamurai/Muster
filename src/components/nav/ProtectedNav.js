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

                <li className="trade">
                  <Link to='/trade'>
                    <LinkButton title='Trade' clickFunction={() => { }} />
                  </Link>
                </li>

                <li className="link-button">
                  <Link to="/">
                    <LinkButton title='Logout' clickFunction={() => {firebaseAuth().signOut()}} />
                  </Link>
                </li>

              <li style={{float: "right"}}>
              <Link to="/searching">
                <SearchHits/>
              </Link>
              </li>
              <br/>
              <li style={{float: "right"}}>
                <SearchToggler searchBy={this.props.searchBy}/>
              </li>
              </ul>

            </div>
          </nav>
        </div>
    )
  }
}
