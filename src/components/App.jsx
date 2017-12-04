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
    this.addNewCollection = addNewCollection.bind(this);
  }

  componentDidMount() {
    this.checkAuthStatus()
    category.on('value', snap => {
      this.setState({popularCategoryList: snap.val()})
      // console.log('state popcat', this.state.popularCategoryList)
    })
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.authed
          ? (
           <div>

              {/* <Redirect exact from='/login' to='/'/> */}

              <ProtectedNav user={this.state.user} />
              <MyCollections
                class="sidenav"
                user={this.state.user}
                addNewCollection={this.addNewCollection}
                searchMyCollections={this.searchMyCollections}
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
              <Route exact path='/profile/:uid' component={ProfileFrame} />
            <Route exact path='/addItems' render={() => <AddItems user={this.state.user}/>} />
              <Route exact path='/collections/:categoryId' component={CollectionList} />
              <Route exact path='/items/:collectionId' component={(props) =>  <ItemList {...props} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}
