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
import ManageInventory from './manageInventory/ManageInventory';
import MessageFrame from './messaging/MessageFrame';
import AddItems from './addItems/addItems';
import Trade from './trade/Trade';
// import ImageModel from './model/ImageModel';

import UserInfo from './userBar/UserInfo.jsx';
import ProfileFrame from './profilePages/ProfileFrame';
import { checkAuthStatus } from './authentication/authenticationHelpers';
import { getPopularCategory, getCollection, getItem, getCategory } from './helperElements/FetchData';
import Search from './helperElements/Search.jsx' // importing default
import { connectHits } from 'react-instantsearch/dom'

import ChatRoomList from './messaging/ChatRoomList'

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
      indexName: 'item',
      toggleChat: false
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
    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleChat(){
    this.setState({toggleChat: !this.state.toggleChat})
  }

  componentDidMount() {
    this.checkAuthStatus(this.getCollection, this.getUserObj, this.getRequestData);
    this.getPopularCategory();
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
    // console.log('this function changes indexName as state')
    this.setState({indexName : receiveIndexName})
  }
  

  render() {
    // console.log('this is the user in APP: ', this.state.user)
    return (
      <Router>
        <InstantSearch
        appId="9VH3I9OJWS"
        apiKey="289636a507e4853ef95cc5b7e4cac8d9"
        indexName={this.state.indexName}
        urlSync={true}
        >
          <div className= 'app-container'>
          {this.state.authed
          ? (
            <div className='nav-container'>
              <div className= 'protectednav-container'> 
                <ProtectedNav user={this.state.user} searchBy={this.searchBy}/>
              </div>

              <div className='mycollections-container'>
                <MyCollections
                  user={this.state.user}
                  userId={this.state.userId}
                  addNewCollection={this.addNewCollection}
                  searchMyCollections={this.searchMyCollections}
                  collections={this.state.collections}
                  getCollection={this.getCollection}
                />
              </div>
              {this.state.toggleChat ? 
              <div className="chat-container">
                <ChatRoomList />
              </div>
              : 
              <div></div>
              }

              <div className="chat_button" onClick={this.toggleChat}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50"><path d="M15 42h-2l1.2-1.6c.8-1.1 1.3-2.5 1.6-4.2C10.8 33.9 8 29.6 8 24c0-8.6 6.5-14 17-14s17 5.4 17 14c0 8.8-6.4 14-17 14h-.7c-1.6 1.9-4.4 4-9.3 4zm10-30c-9.4 0-15 4.5-15 12 0 6.4 3.9 9.4 7.2 10.7l.7.3-.1.8c-.2 1.6-.5 3-1.1 4.2 3.3-.4 5.2-2.1 6.3-3.5l.3-.4H25c13.5 0 15-8.4 15-12C40 16.5 34.4 12 25 12z" /></svg>
              </div>
            </div>


          )
          : (
              <div className= 'unprotectednav-container'>
                <UnprotectedNav setIsOnAuthFrame={this.setIsOnAuthFrame} />
                <div className="login-form-outerbox">
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
            <Route exact path='/addItems' 
              render={() => 
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


