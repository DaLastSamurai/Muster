import React from 'react';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import InventoryCollection from './InventoryCollection';
import InventoryLocation from './InventoryLocation';
import InventoryCategory from './InventoryCategory';



class ManageInventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categorys: {},
      collections: {},
      items: {},
      sort: 'collection',
    }
    this.getCollection = this.getCollection.bind(this);
    this.getItem = this.getItem.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
  }
 
  componentDidMount() {
    this.props.userId ? this.getCollection(this.props.userId) : null;
  }

  getCollection(userid) {
    new Promise((resolve, reject) => {
      users.child(userid).on('value',(snap) => {
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
    .then((colArr) => {
      var tempObj = {};
      colArr.forEach((col) => {
        tempObj[col[0]] = col[1]
      })
      this.setState({collections: tempObj});
      return tempObj;
    })
    .then((colObj) => {
      console.log('from state collections', this.state.collections)
      var itemIdArr = [];
      Object.values(colObj).forEach((eachObj) => {
        if (eachObj.itemId) {
          itemIdArr = itemIdArr.concat(Object.keys(eachObj.itemId));
        }
      })
      this.getItem(itemIdArr);
      this.getCategory();
    })
  }

  getItem(itemIdArr) {
    let itemObjArr = [];
    itemIdArr.forEach((itemId) => {
      let tempPromise = new Promise((resolve, reject) => {
        item.child(itemId).on('value', (snap) => {
          resolve([itemId, snap.val()])
        })
      })
      itemObjArr.push(tempPromise)
    })
    return Promise.all(itemObjArr)
    .then((data) => {
      let tempObj = {};
      data.forEach((arr) => {
        tempObj[arr[0]] = arr[1]
      })
      this.setState({items: tempObj})
    })
    .then(() => {
      console.log('from state items', this.state.items)
    })
  }

  getCategory() {
    let categoryArr = [];
    Object.values(this.state.collections).forEach((obj) => {
      let catId = obj.categoryId
      let temp = new Promise((resolve, reject) => {
        category.child(catId).on('value', (snap) => {
          resolve([catId, snap.val()])
        })
      })
      categoryArr.push(temp);
    })
    return Promise.all(categoryArr)
    .then((data) => {
      let tempObj = {};
      data.forEach((arr) => {
        tempObj[arr[0]] = arr[1]
      })
      this.setState({categorys: tempObj})
      console.log('get category from state', this.state.categorys)
    })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.props !== nextProps) {
  //     if(this.props.userId !== null) {
  //       this.getCollection(this.props.userId)
  //     }
  //     return true
  //   }
  //   return false
  // }

  handleSortBy(e) {
    // console.log('sortt',(e.target.value))
    this.setState({sort: e.target.value})
    // console.log('from state', this.state.sort)
  }

  render() {
    // console.log('should rerender',this.state.collections)
    return(
      <div>
        <select onChange={this.handleSortBy}>
          <option value="collection">by collection</option>
          <option value="location">by location</option>
          <option value="category">by category</option>
        </select>
          {JSON.stringify(this.state.collections) !== "{}" && JSON.stringify(this.state.items) !== '{}' 
          ? <InventoryCollection collectionList={this.state.collections} itemList={this.state.items} /> 
          : 'loading'}
          {/* <InventoryLocation />
          <InventoryCategory /> */}
      </div>
    )
  }
}

export default ManageInventory;