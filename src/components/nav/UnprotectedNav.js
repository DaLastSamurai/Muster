// This navbar will show up when the user is not logged in. 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
import SearchBar from '../helperElements/SearchBar'
import AuthFrame from '../authentication/AuthFrame'

export default class UnprotectedNav extends React.Component {
  constructor() {
    super();
    this.state = {

    }; 

  }

  componentDidMount() { 

  }

  /* THIS IS THE UNPROTECTED NAV, MEANING ALL BUTTONS AND ROUTES WILL BE VISIBLE
      ONLY WHEN THE USER IS NOT SIGNED IN */
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
                  <Link to="/b">
                    <LinkButton title='Landing' clickFunction={() => {}}/>
                  </Link>
                </li>

                <li className="link-button">
                  <Link to="/login">
                    <LinkButton title='Login' clickFunction={() => {}} />
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
          {/*  */}
          <Switch> 
            <Route exact path="/login" 
              render={() => <AuthFrame user={this.props.user}/>} 
            />
            <Route exact path="/a" 
              render={() => <div> You clicked a button without a Route!</div> } 
            />
            <Route exact path="/b" 
              render={() => <div> You clicked a button without a Route!</div>} 
            />
          </Switch> 
          
        </div>
      </Router>
    )
  }
}