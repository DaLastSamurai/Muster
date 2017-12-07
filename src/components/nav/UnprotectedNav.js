// This navbar will show up when the user is not logged in.
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
import AuthFrame from '../authentication/AuthFrame'
import { SearchHits } from '../helperElements/Search.jsx'

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
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav navbar-legt">
                <li className="logo"><Logo />
                </li>

                <li className="link-button">
                  <Link to="/">
                    <LinkButton title='Home' clickFunction={() => {}}/>
                  </Link>
                </li>

                <li className="link-button">
                  <Link to="/">
                    <LinkButton title='Login' clickFunction={() => {
                      // this needs to set state in the app that will cause the
                      // auth frame to render and then unrender on rerender.
                      this.props.setIsOnAuthFrame(true)
                    }} />
                  </Link>
                </li>

              </ul>
              <Link to="/searching">
                <SearchHits />
              </Link>
              {/*<ul className="nav navbar-nav">
                <li className="navbar-text navbar-center align-top search-bar">
                  <SearchBar search={(input) => {console.log(`you searched: ${input}, but this search function doesnt do shit`)}}/>
                </li>
              </ul>*/}

            </div>
          </nav>
          {/* use react router to only show one of our components at a time */}
          {/*  */}
          {/*
            <Route exact path="/login"
              render={() => <AuthFrame user={this.props.user} isSigningUp={false}/>}
            />
            <Route exact path="/a"
              render={() => <div> You clicked a button without a Route!</div> }
            />
            <Route exact path="/b"
              render={() => <div> You clicked a button without a Route!</div>}
            />
            <Route exact path='/popularcategory' render={() => <PopularCategoryList/>} />
          */}
        </div>
    )
  }
}
