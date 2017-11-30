import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth, rootRef } from '../../config/firebaseCredentials';
import UnprotectedNav from './nav/UnprotectedNav';
import ProtectedNav from './nav/ProtectedNav';
import PopularCategoryList from './popularcategory/PopularCategoryList';
import MyCollections from './userBar/MyCollections.jsx'
import AuthFrame from './authentication/AuthFrame';
import CollectionList from './collections/CollectionList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
    };
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus()
    rootRef.on('value', snap => {
      console.log(snap.val())//will consolelog all data we have in db
    })
  }

  checkAuthStatus() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed : true,
          user: user,
        })
      } else {
        this.setState({
          authed : false,
          user : null,
        })
      }
    })
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
          : (<UnprotectedNav />)}

          <Switch>
            <Redirect exact from='/' to='/popularcategory'/>
            <Route exact path='/popularcategory' render={() => <PopularCategoryList />} />
            <Route exact path='/login' render={() => <AuthFrame user={this.props.user} isSigningUp={false} />} />
            <Route exact path='/collections' render={() => <CollectionList />} />
          </Switch>
        </div>
      </Router>
    )
  }
}








