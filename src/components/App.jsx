import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth, rootRef, collection, category, item } from '../../config/firebaseCredentials';
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
      popularCategoryList: [],
      clickedCategory: ['default clicked cat'],
    };
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
    this.handleClickFromPopularCat = this.handleClickFromPopularCat.bind(this);
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
              <MyCollections user={this.state.user} />
           </div>
           )
          : (<UnprotectedNav />)}

          <Switch>
            <Redirect exact from='/' to='/popularcategory'/>
            <Route exact path='/popularcategory' render={() => 
              <PopularCategoryList popularCategoryList={this.state.popularCategoryList}
              handleClickFromPopularCat={this.handleClickFromPopularCat}
              />}
            />
            <Route exact path='/login' render={() => 
              <AuthFrame user={this.props.user} isSigningUp={false} />} 
            />
            <Route exact path='/collections' render={() => 
              <CollectionList clickedCollectionList={this.state.clickedCategory}/>} 
            />
          </Switch>
        </div>
      </Router>
    )
  }
}








