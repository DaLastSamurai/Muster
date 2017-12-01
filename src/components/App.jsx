import React from 'react';
import firebase from 'firebase'; 
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../config/firebaseCredentials';
import UnprotectedNav from './nav/UnprotectedNav';
import ProtectedNav from './nav/ProtectedNav';
import PopularCategoryList from './popularcategory/PopularCategoryList';
import MyCollections from './userBar/MyCollections.jsx'
import AuthFrame from './authentication/AuthFrame';
import CollectionList from './collections/CollectionList';

import { checkAuthStatus } from './authentication/authenticationHelpers'; 
import ProfileFrame from './profilePages/ProfileFrame'; 
import UserInfo from './userBar/UserInfo.jsx'
import AddItems from './addItems/addItems';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
    };
    // this is being imported from authenticationHelpers
    this.checkAuthStatus = checkAuthStatus.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus()
    console.log('userinfo', firebaseAuth.currentUser)
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.authed
          ? (
           <div>
              <Redirect exact from='/login' to='/popularcategory'/>
              <ProtectedNav user={this.state.user} />
              <MyCollections user={this.state.user} />
           </div>
           )
          : (<UnprotectedNav />)
          }

          <Switch>
            <Redirect exact from='/' to='/popularcategory'/>
            <Route exact path='/' render={() => <PopularCategoryList/>} />
            <Route exact path='/popularcategory' render={() => <PopularCategoryList />} />
            <Route exact path='/login' render={() => <AuthFrame user={this.props.user} isSigningUp={false} />} />
            <Route exact path='/collections' render={() => <CollectionList />} />
            <Route exact path='/profile' render={() => <ProfileFrame />} />
            <Route exact path='/addItems' render={() => <AddItems />} />

          </Switch>
        </div>
      </Router>
    )
  }
}
