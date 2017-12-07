//user collection list should
//show up on the left side and persist whenever user is logged in
import React from 'react';
import { firebaseAuth, rootRef, collection, category, item, users } from '../../../config/firebaseCredentials';
import { addNewCollection } from './writeNewCollectionHelpers'
import SearchBar from '../helperElements/SearchBar';
import MyCollectionsList from './MyCollectionsList.jsx';
import NewCollectionsInput from './NewCollectionsInput.jsx';
import UserInfo from './UserInfo.jsx';
import AddItems from '../addItems/addItems';

import { withRR4 } from 'react-sidenav';
import { Link } from 'react-router-dom'

const SideNav = withRR4();

export default class MyCollections extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showInputForm: false,
      collectionList: [],
    };
    this.getUserCollection = this.getUserCollection.bind(this);
    this.handleAddCollection = this.handleAddCollection.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
    this.addNewCollection = addNewCollection.bind(this);
  }

  componentDidMount() {
    this.getUserCollection()
  }

  getUserCollection() {
    new Promise((resolve, reject) => {
      users.child(firebaseAuth().currentUser.uid).on('value',(snap) => {
        let array = [];
        for(var key in snap.val().collectionIds){
          if(key !== "0") {
            array.push(key)
          }
        }
        return resolve(array)
      })
    })
    .then((collectionIdArr) => {
      var arr = [];
      collectionIdArr.forEach(id => {
        var tempPromise = new Promise((resolve, reject) => {
          collection.child(id).on('value', (snap) => {
            resolve([id, snap.val()])
          })
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    })
    .then(data => {
      this.setState({collectionList: data})
    })
    // .catch(console.log('error: getUSerCollection function in Mycollections'))
  }

  deleteCollection(collectionId) {
    new Promise((resolve, reject) => {
      collection.child(collectionId).child('categoryId').on('value', (snap) => {
        resolve(snap.val())
      })
    })
    .then((categoryId )=> {
      category.child(categoryId).child('collectionId').child(collectionId).remove()
    })
    .then(() =>
      users.child(firebaseAuth().currentUser.uid).child('collectionIds').child(collectionId).remove()
    )
    .then(() =>
      collection.child(collectionId).remove()
    )
    .then(() =>
      this.getUserCollection()
    )
  }

  handleAddCollection() {
    this.getUSerCollection()
  }

  render() {
    return(
      <div style={{width: 220, float: 'left', margin: '1.5%'}} className="container-fluid">
        <SideNav>
          <Link to={`/profile/${this.props.user.uid}`}>
            <UserInfo user={this.props.user} clickFunction={() => {}}/>
          </Link>
        </SideNav>
        <SideNav>
          <button type="button" className="btn btn-outline-secondary bg-primary" 
            onClick={()=>{this.setState({showInputForm:!this.state.showInputForm})}}>
            New Collection
          </button>
            {this.state.showInputForm ? 
              (<NewCollectionsInput addNewCollection={this.addNewCollection} handleAddCollection={this.handleAddCollection} />) : 
              (<div/>)}
        </SideNav>
        <Link to={'/addItems/'}>
          <button type="button" className="btn btn-outline-secondary bg-primary">Add Items</button>
        </Link>
        <SideNav>
          <SearchBar search={(input) => 
            { this.props.searchMyCollections(input) }} />
        </SideNav>
        <SideNav>
          {this.state.collectionList.length > 0 ? 
            <MyCollectionsList deleteCollection={this.deleteCollection} collectionList={this.state.collectionList} /> : 
            <h5>add collection</h5>}
        </SideNav>
      </div>
    )
  }
}
