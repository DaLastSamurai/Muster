// This navbar will show up when the user is logged in. 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
import SearchBar from '../helperElements/SearchBar'

export default class ProtectedNav extends React.Component {
  constructor() {
    super();
    this.state = {}; 

  }

  componentDidMount() { 

  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default">     
            <div className="container-fluid">
              <ul className="nav navbar-nav navbar-legt">
                <li className="logo"><Logo />
                </li>

                <li className="link-button">
                  <Link to="/a">
                    <LinkButton title='Some Button' clickFunction={() => {}}/>
                  </Link>
                </li>

                <li className="link-button">
                  <Link to="/">
                    <LinkButton title='Landing' clickFunction={() => {}}/>
                  </Link>
                </li>

                <li className="link-button">
                  <Link to="/logout">
                    <LinkButton title='Logout' clickFunction={() => {firebaseAuth().signOut()}} />
                  </Link>
                </li>

              </ul>
              <ul className="nav navbar-nav">
                <li className="navbar-text navbar-center align-top search-bar">
                  <SearchBar search={(input) => {console.log(`you searched: ${input}, but this search function doesnt do shit`)}}/>
                </li>
              </ul>

            </div>
          </nav>
          {/* use react router to only show one of our components at a time */}
          {/* This takes the user back to the login page when they sign out
              We may want to change this so that it redirects to the main page */}

          <Route exact path="/logout" 
            render={() => <AuthFrame />} 
          />
          <Route exact path="/a" 
            render={() => <div> You clicked a button without a Route!</div> } 
          />
          <Route exact path="/b" 
            render={() => <div> You clicked a button without a Route!</div>} 
          />
        </div>
      </Router>
    )
  }
}