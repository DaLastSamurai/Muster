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
import ManageInventory from './manageInventory/ManageInventory';

import { checkAuthStatus } from './authentication/authenticationHelpers';
import ProfileFrame from './profilePages/ProfileFrame';
import UserInfo from './userBar/UserInfo.jsx'
import AddItems from './addItems/addItems';

import {InstantSearch, SearchBox, Hits, Highlight} from 'react-instantsearch/dom';
import { Search } from './helperElements/Search.jsx'
import MessageFrame from './messaging/MessageFrame'
import { addToFavCat } from './popularcategory/PopCatHelper.jsx'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
      isOnAuthFrame: false,
      popularCategoryList: [],
      collectionList:[],
      userId: null,
    };

    this.checkAuthStatus = checkAuthStatus.bind(this);
    this.setIsOnAuthFrame = this.setIsOnAuthFrame.bind(this); 
    this.reloadPage = this.reloadPage.bind(this); 
    this.getPopularCategory = this.getPopularCategory.bind(this);
    this.addToFavCat = addToFavCat.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus()
    this.getPopularCategory()
  }

  getPopularCategory() {
    new Promise((resolve, reject) => {
      category.on('value', (snap) => {
        return resolve(snap.val())
      })
    })
    .then((categoryObj) => {
      var arr = [];
      Object.keys(categoryObj).forEach((key) => {
        var tempPromise = new Promise((resolve, reject) => {
          let collectionCount = Object.keys(categoryObj[key]['collectionId']).length
          resolve([key, categoryObj[key], collectionCount])
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    })
    .then((data) => {
      return data.sort((a, b) => {
        return b[2] - a[2];
      })
    })
    .then(data => {
      this.setState({popularCategoryList: data})
    })
  }

  setIsOnAuthFrame(isOnAuthFrame) {
    this.setState({isOnAuthFrame})
  }

  reloadPage() {
    // console.log("the reload page gets run")
    window.location.reload()
  }

  render() {
    console.log('app',this.state.userId)
    return (
      <Router>
      <InstantSearch
      appId="9VH3I9OJWS"
      apiKey="289636a507e4853ef95cc5b7e4cac8d9"
      indexName="item"
      >
          <div>
            {this.state.authed
            ? (
             <div>
                <ProtectedNav user={this.state.user} />
                <MyCollections
                  class="sidenav"
                    user={this.state.user}
                  addNewCollection={this.addNewCollection}
                  searchMyCollections={this.searchMyCollections}
                  collectionList={this.state.collectionList}
                />
             </div>
            )
            : (
                <div>
                  <UnprotectedNav setIsOnAuthFrame={this.setIsOnAuthFrame} />
                  <div>
                    {this.state.isOnAuthFrame
                      ? (<AuthFrame user={this.props.user} isSigningUp={false} />)
                      : (<div />
                      )
                    }
                  </div>
                </div>
              )
            }
            <Switch>
                <Route exact path='/' render={() =>
                  this.state.isOnAuthFrame
                  ? (<div />)
                  : <PopularCategoryList popularCategoryList={(this.state.popularCategoryList)} addToFavCat={this.addToFavCat} />
                  }
                />
                <Route path='/profile/:uid' onEnter={() => {this.reloadPage()}} component={ProfileFrame} />
                <Route exact path='/addItems' render={() => <AddItems user={this.state.user}/>} />
                <Route exact path='/collections/:categoryId' component={CollectionList} />
                <Route exact path='/items/:collectionId' component={(props) =>  <ItemList {...props} />} />
                <Route exact path='/searching' render={()=> <Search />}/>
                <Route exact path='/manageinventory' render={() => <ManageInventory userId={this.state.userId}/>} />
            </Switch>

          </div>
        </InstantSearch>
      </Router>
    )
  }
}
