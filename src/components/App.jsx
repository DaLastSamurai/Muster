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
    
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
    this.handleClickFromPopularCat = this.handleClickFromPopularCat.bind(this);
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
    console.log('userinfo', firebaseAuth.currentUser)

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

            <Route exact path='/popularcategory' render={() => 
              <PopularCategoryList popularCategoryList={this.state.popularCategoryList}
              handleClickFromPopularCat={this.handleClickFromPopularCat}/>} />
            <Route exact path='/login' render={() => 
              <AuthFrame user={this.props.user} isSigningUp={false} />} />
            <Route exact path='/collections' render={() => <CollectionList />} />
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
