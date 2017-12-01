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
      popularCategoryList: [],
      clickedCategory: ['default clicked cat'],
    };

    this.checkAuthStatus = checkAuthStatus.bind(this);
    this.handleClickFromPopularCat = this.handleClickFromPopularCat.bind(this);
    this.addNewCollection = this.addNewCollection.bind(this);
    this.addToClickedCategory = this.addToClickedCategory.bind(this);
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
      this.setState({popularCategoryList: snap.val()})
      console.log('popularcat from state', this.state.popularCategoryList)
    })
    item.on('value', snap => {
      console.log('item', snap.val())
    })
  }


  handleClickFromPopularCat(collectionIds) {
    // let collectionInCat = [];
    // collection.on('value', snap => {
    //   let collections = snap.val()
    //   collectionIds.forEach((id) =>
    //     collectionInCat.push(collections[id]))
    // })
    //   this.setState({clickedCategory: collectionInCat})
    //   // console.log(this.state.clickedCategory)

    // console.log(this.state.clickedCategory)
    collectionIds.map((id) =>
      collection.orderByKey().equalTo(id).on("value", function(snapshot) {
      // console.log(snapshot.key);
      console.log(snapshot.val())
    }))

    // console.log('>>', cococ)


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
  
  addToClickedCategory(newState) {
    this.setState({clickedCategory: newState})
    // console.log('sdsdsd', this.state.clickedCategory)
  };

  handleClickFromPopularCat(collectionIds, callback=this.addToClickedCategory) {
    callback(
      collectionIds.map((id) =>{
        let obj = null;
        collection.orderByKey().equalTo(id).on("value", function(snapshot) {
          obj = snapshot.val();
        })
        return obj;
      })  
    )
    
  };

  render() {
    return (
      <Router>
        <div>
          {this.state.authed
          ? (
           <div>
              <Redirect exact from='/login' to='/popularcategory'/>
              <ProtectedNav user={this.state.user} />
              <MyCollections
                user={this.state.user}
                addNewCollection={this.addNewCollection}
              />
           </div>
           )
          : (<UnprotectedNav />)
          }

          <Switch>
            <Redirect exact from='/' to='/popularcategory'/>

            <Route exact path='/popularcategory' render={() =>
              <PopularCategoryList popularCategoryList={this.state.popularCategoryList}
              handleClickFromPopularCat={this.handleClickFromPopularCat}/>} />
            <Route exact path='/login' render={() =>
              <AuthFrame user={this.props.user} isSigningUp={false} />} />
            <Route exact path='/' render={() => <PopularCategoryList/>} />
            <Route exact path='/profile/:curUser/:uid' component={ProfileFrame} />
            <Route exact path='/addItems' render={() => <AddItems />} />
            <Route exact path='/collections' render={() => 
              <CollectionList clickedCollectionList={this.state.clickedCategory}/>} />
          </Switch>
        </div>
      </Router>
    )
  }
}
