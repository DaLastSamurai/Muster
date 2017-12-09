import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../config/firebaseCredentials';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination } from 'react-instantsearch/dom';
//react component
import UnprotectedNav from './nav/UnprotectedNav';
import ProtectedNav from './nav/ProtectedNav';
import PopularCategoryList from './popularcategory/PopularCategoryList';
import MyCollections from './userBar/MyCollections.jsx'
import AuthFrame from './authentication/AuthFrame';
import CollectionList from './collections/CollectionList';
import ItemList from './items/ItemList';
import ManageInventory from './manageInventory/ManageInventory';
import MessageFrame from './messaging/MessageFrame';
import AddItems from './addItems/addItems';
import UserInfo from './userBar/UserInfo.jsx';
import ProfileFrame from './profilePages/ProfileFrame';
import { Search } from './helperElements/Search.jsx';
//helper
import { checkAuthStatus } from './authentication/authenticationHelpers';

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
      indexName: 'item'
    };

    this.checkAuthStatus = checkAuthStatus.bind(this);
    this.setIsOnAuthFrame = this.setIsOnAuthFrame.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.getPopularCategory = this.getPopularCategory.bind(this);
    this.searchBy = this.searchBy.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus()
    this.getPopularCategory()
  }

  // getPopularCategory() {
  //   new Promise((resolve, reject) => {
  //     category.on('value', (snap) => {
  //       return resolve(snap.val())
  //     })
  //   })
  //   .then((categoryObj) => {
  //     var arr = [];
  //     Object.keys(categoryObj).forEach((key) => {
  //       var tempPromise = new Promise((resolve, reject) => {
  //         let collectionCount = Object.keys(categoryObj[key]['collectionId']).length
  //         resolve([key, categoryObj[key], collectionCount])
  //       })
  //       arr.push(tempPromise);
  //     })
  //     return Promise.all(arr);
  //   })
  //   .then((data) => {
  //     return data.sort((a, b) => {
  //       return b[2] - a[2];
  //     })
  //   })
  //   .then(data => {
  //     this.setState({popularCategoryList: data})
  //   })
  // }

  setIsOnAuthFrame(isOnAuthFrame) { this.setState({isOnAuthFrame}) }

  reloadPage() { window.location.reload() }

  searchBy(receiveIndexName) {
    console.log('this function changes indexName as state')
    this.setState({indexName : receiveIndexName})
  }

  render() {
    return (
      <Router>
        <InstantSearch
        appId="9VH3I9OJWS"
        apiKey="289636a507e4853ef95cc5b7e4cac8d9"
        indexName={this.state.indexName}
        >
        <div>
          {this.state.authed
          ? (
            <div>
              <ProtectedNav user={this.state.user} searchBy={this.searchBy}/>
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
              : <PopularCategoryList popularCategoryList={this.state.popularCategoryList} />
              }
            />
            <Route path='/profile/:uid' onEnter={() => {this.reloadPage()}} component={ProfileFrame} />
            <Route exact path='/addItems' render={() => <AddItems user={this.state.user}/>} />
            <Route exact path='/collections/:categoryId' component={CollectionList} />
            <Route exact path='/items/:collectionId' component={(props) =>  <ItemList {...props} userId={this.state.userId} />} />
            <Route exact path='/searching' render={()=> <Search />}/>
            <Route exact path='/manageinventory' render={() => <ManageInventory userId={this.state.userId}/>} />
          </Switch>

        </div>
        </InstantSearch>
      </Router>
    )
  }
}
