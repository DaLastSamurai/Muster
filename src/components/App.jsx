import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../config/firebaseCredentials';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination } from 'react-instantsearch/dom';

//react component
import UnprotectedNav from './nav/UnprotectedNav';
import ProtectedNav from './nav/ProtectedNav';
import CategoryList from './popularcategory/CategoryList';
import CollectionList from './popularcategory/CollectionList';
import ItemList from './popularcategory/ItemList';
import MyCollections from './userBar/MyCollections.jsx'
import AuthFrame from './authentication/AuthFrame';
// import CollectionList from './collections/CollectionList';
// import ItemList from './items/ItemList';
import ManageInventory from './manageInventory/ManageInventory';
import MessageFrame from './messaging/MessageFrame';
import AddItems from './addItems/addItems';
import Trade from './trade/Trade';

import UserInfo from './userBar/UserInfo.jsx';
import ProfileFrame from './profilePages/ProfileFrame';
import { checkAuthStatus } from './authentication/authenticationHelpers';
import { getPopularCategory, getCollection, getItem, getCategory } from './helperElements/FetchData';
import Search from './helperElements/Search.jsx' // importing default
import { connectHits } from 'react-instantsearch/dom'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
      userId: null,
      userObj: {},
      isOnAuthFrame: false,
      popularCategoryList: [],
      categorys: {},
      collections: {},
      items: {},
      request: {},
      editItem: '',
      indexName: 'item'
    };

    this.checkAuthStatus = checkAuthStatus.bind(this);
    this.setIsOnAuthFrame = this.setIsOnAuthFrame.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.getPopularCategory = getPopularCategory.bind(this);
    this.searchBy = this.searchBy.bind(this);
    this.getCollection = getCollection.bind(this); //takes user id
    this.getItem = getItem.bind(this); //takes item id array
    this.getCategory = getCategory.bind(this); //takes collection object
    this.getRequestData = this.getRequestData.bind(this);
    this.getItem = getItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.getUserObj = this.getUserObj.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus(this.getCollection, this.getUserObj, this.getRequestData)
    this.getPopularCategory()
    
  }

  getUserObj(userId) {
    users.child(userId).on('value', (snap) => {
      this.setState({userObj: snap.val()})
    })
  }

  getRequestData(userId) {
    rootRef.child('request').child(userId).on('value', (snap) => {
      this.setState({request: snap.val()})
    })
  }
  
  editItem(clickedItem) {
    this.setState({
      editItem: clickedItem
    })
  }

  setIsOnAuthFrame(isOnAuthFrame) { this.setState({isOnAuthFrame}) }

  reloadPage() { window.location.reload() }

  searchBy(receiveIndexName) {
    console.log('this function changes indexName as state')
    this.setState({indexName : receiveIndexName})
  }
  

  render() {console.log('app', this.state)
    return (
      <Router>
        <InstantSearch
        appId="9VH3I9OJWS"
        apiKey="289636a507e4853ef95cc5b7e4cac8d9"
        indexName={this.state.indexName}
        >
        <div className="main">
          {this.state.authed
          ? (
            <div>
              <ProtectedNav user={this.state.user} searchBy={this.searchBy}/>
              <MyCollections
                class="sidenav"
                user={this.state.user}
                addNewCollection={this.addNewCollection}
                searchMyCollections={this.searchMyCollections}
                collectionList={this.state.collections}
                // getUserCollection={this.getUserCollection}
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
              : <CategoryList popularCategoryList={this.state.popularCategoryList} />
              } />
            <Route exact path='/collections/:categoryId' component={CollectionList} />
            <Route exact path='/items/:collectionId' component={(props) =>  
            <ItemList {...props} userId={this.state.userId} />} />

            <Route path='/profile/:uid' onEnter={() => {this.reloadPage()}} component={ProfileFrame} />
            <Route exact path='/addItems' render={() => 
              <AddItems 
                user={this.state.user} 
                userId={this.state.userId} 
                editItem={this.state.editItem}
              />} />
            <Route exact path='/searching' render={()=> <Search />}/>
            <Route exact path='/manageinventory' render={() => 
              <ManageInventory
                editItem={this.editItem}
                categorys={this.state.categorys} 
                collections={this.state.collections} 
                items={this.state.items} 
                userId={this.state.userId}
                getData={this.getCollection} />}
                getUserCollection={this.getUserCollection} />
            <Route exact path='/trade' render={() =>
              <Trade 
                userObj={this.state.userObj}
                userId={this.state.userId}
                getData={this.getCollection}
                getRequestData={this.getRequestData}
                collections={this.state.collections}
                items={this.state.items}
                request={this.state.request} />}/>
          </Switch>

        </div>
        </InstantSearch>
      </Router>
    )
  }
}


