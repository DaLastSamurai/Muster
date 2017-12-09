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
//helper function
import { checkAuthStatus } from './authentication/authenticationHelpers';
import { getPopularCategory, getCollection, getItem, getCategory } from './helperElements/FetchData';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
      userId: null,
      isOnAuthFrame: false,
      popularCategoryList: [],
      collectionList:[],
      categorys: {},
      collections: {},
      items: {},
    };

    this.checkAuthStatus = checkAuthStatus.bind(this);
    this.setIsOnAuthFrame = this.setIsOnAuthFrame.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.getPopularCategory = getPopularCategory.bind(this);
    // this.getCurUserCollectionId = this.getCurUserCollectionId.bind(this);
    this.getCollection = getCollection.bind(this); //takes user id
    this.getItem = getItem.bind(this); //takes item id array
    this.getCategory = getCategory.bind(this); //takes collection object
  }

  componentDidMount() {
    this.checkAuthStatus((this.getCollection))
    this.getPopularCategory()
  }

  setIsOnAuthFrame(isOnAuthFrame) { this.setState({isOnAuthFrame}) }

  reloadPage() { window.location.reload() }

  render() {
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
              : <PopularCategoryList popularCategoryList={this.state.popularCategoryList} />
              }
            />
            <Route path='/profile/:uid' onEnter={() => {this.reloadPage()}} component={ProfileFrame} />
            <Route exact path='/addItems' render={() => <AddItems user={this.state.user} userId={this.state.userId} />} />
            <Route exact path='/collections/:categoryId' component={CollectionList} />
            <Route exact path='/items/:collectionId' component={(props) =>  <ItemList {...props} userId={this.state.userId} />} />
            <Route exact path='/searching' render={()=> <Search />}/>
            <Route exact path='/manageinventory' render={() => 
              <ManageInventory 
                // onEnter={() => {this.getCollection(this.state.userId)}}
                categorys={this.state.categorys} 
                collections={this.state.collections} 
                items={this.state.items} 
                userId={this.state.userId}
                getData={this.getCollection} />} />
          </Switch>

        </div>
        </InstantSearch>
      </Router>
    )
  }
}
