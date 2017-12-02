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
import ItemList from './items/ItemList';

import { checkAuthStatus } from './authentication/authenticationHelpers';
import ProfileFrame from './profilePages/ProfileFrame';
import UserInfo from './userBar/UserInfo.jsx'
import AddItems from './addItems/addItems';
import { addNewCollection } from './userBar/writeNewCollectionHelpers'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
      popularCategoryList: [],
    };

    this.checkAuthStatus = checkAuthStatus.bind(this);
    this.addNewCollection = this.addNewCollection.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus()
    category.on('value', snap => {
      this.setState({popularCategoryList: snap.val()})
      // console.log('state popcat', this.state.popularCategoryList)
    })
  }

  //retrieve the specific logged in users's UID > array of collection IDs
  //add new collectionID key from push into that array

  //add to collection with collectionID key
  //put in other stuff including uid

  addNewCollection(addCollection, addCategory, photoURL) {
    // console.log('new collection name', addCollection)
    // console.log('new category name', addCategory)
    // console.log('all collections', collection)
    // console.log('currentUID retrieved from auth', firebase.auth().currentUser.uid)
    // console.log('new hash for collection id', collection.push().key)

    let newCollectionId = collection.push().key
    let currentUID = firebase.auth().currentUser.uid

    let updateCollections = function() {
      let collectionData = {
        categoryId: addCategory,
        itemId:[0],
        name:addCollection,
        photoUrl:"",
        public: true,
        uid:[currentUID]
      }
      let updates = {};
      updates[newCollectionId] = collectionData;
      return collection.update(updates);
    }

    let updateUsers = function() {
      let updates = {};
      updates[currentUID + '/collectionIds/' + newCollectionId] = newCollectionId;
      return users.update(updates)
    }

    updateCollections();
    updateUsers();
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.authed
          ? (
           <div>
              <ProtectedNav user={this.state.user} />
              <MyCollections
                user={this.state.user}
                addNewCollection={this.addNewCollection}
                getMyCollections={this.getMyCollections}
              />
           </div>
           )
          : (<UnprotectedNav />)
          }
          <Switch>
            <Route exact path='/login' render={() =>
              <AuthFrame user={this.props.user} isSigningUp={false} />} />
            <Route exact path='/' render={() => 
              <PopularCategoryList popularCategoryList={(this.state.popularCategoryList)} />} />
            <Route exact path='/profile/:curUser/:uid' component={ProfileFrame} />
            <Route exact path='/addItems' render={() => <AddItems />} />
            <Route exact path='/collections/:categoryId' component={CollectionList} />
            <Route exact path='/items/:collectionId' component={ItemList} />
          </Switch>
        </div>
      </Router>
    )
  }
}
