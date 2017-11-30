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
      console.log('every db', snap.val())//will consolelog all data we have in db
    })
    collection.on('value', snap => {
      console.log('collection', snap.val())
    })
    category.on('value', snap => {
      console.log('category', snap.val())
    })
    item.on('value', snap => {
      console.log('item', snap.val())
    })
  }

  checkAuthStatus() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed : true,
          user: user,
        }, () => {
          let basicInfo = {
            email : user.email, 
            isPaidUser : false, 
          }; 
          let updates = {};
          updates[user.uid + '/collectionIds'] = [0]; 
          updates[user.uid + '/info'] = basicInfo;
          return users.update(updates)
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
          : (<UnprotectedNav />)
          }

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








