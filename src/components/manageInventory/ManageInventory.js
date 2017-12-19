import React from 'react';
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
      sort: 'collection',
    }
    this.handleSortBy = this.handleSortBy.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
  }

  deleteCollection(collectionId, itemIdObj) {
    let answer = confirm('are you sure?');
    if (answer === true) {
      new Promise((resolve, reject) => {
        collection.child(collectionId).child('categoryId').on('value', (snap) => {
          resolve(snap.val())
        })
      })
      .then((categoryId )=> {
        category.child(categoryId).child('collectionId').child(collectionId).remove()
      })
      .then(() =>
        users.child(this.props.userId).child('collectionIds').child(collectionId).remove()
      )
      .then(() =>
        collection.child(collectionId).remove()
      )
      .then(() => {
        if (itemObj) {
          Object.keys(itemIdObj).forEach((itemId) => {
            item.child(itemId).remove()
          })
        } else {
          this.props.getData(this.props.userId)
          this.props.getUserCollection()
        }
      })
      .then(() => {
        console.log('this should run')
        this.props.getData(this.props.userId)
        this.props.getUserCollection()
      })
    }
  }

  deleteItem(clickedItemId) {
    let answer = confirm('are you sure?');
    if (answer === true) {
      new Promise((resolve, reject) => {
        item.child(clickedItemId).child('collectionId').on('value', (snap) => {
          resolve(snap.val())
        })
      })
      .then((colId) => {
        collection.child(colId).child('itemId').child(clickedItemId).remove()
      })
      .then(() => {
        item.child(clickedItemId).remove()
      })
  
      this.props.getData()
    }
    
  }

  handleSortBy(e) {
    this.setState({sort: e.target.value})
  }

  
  
//>>>>>>when page out get data
  render() {
    return(
      <div className="manage-inventory-container">
        <div className="manage-sortby-selectbox">
          <h4>Sort by</h4>
          <h4 onClick={() => this.setState({sort: 'collection'})}
              className={this.state.sort === 'collection' ? 'manage-sortby-select' : null}>collection</h4>
          <h4 onClick={() => this.setState({sort: 'category'})}
              className={this.state.sort === 'category' ? 'manage-sortby-select' : null}>category</h4>
          <h4 onClick={() => this.setState({sort: 'location'})}
              className={this.state.sort === 'location' ? 'manage-sortby-select' : null}>location</h4>
        </div>
        {/* <select onChange={this.handleSortBy}
                className="manage-inventory-container-select">
          <option value="collection">sort by collection</option>
          <option value="location">sort by location</option>
          <option value="category">sort by category</option>
        </select> */}
  
          {this.state.sort === 'collection'
            ? <InventoryCollection 
                userId={this.props.userId}
                collectionList={this.props.collections} 
                itemList={this.props.items}
                getData={this.props.getData}
                deleteCollection={this.deleteCollection}
                deleteItem={this.deleteItem}
                editItem={this.props.editItem} />
            : null} 
          {this.state.sort === 'category'
            ? <InventoryCategory 
                userId={this.props.userId}
                collectionList={this.props.collections}
                categoryList={this.props.categorys}
                getData={this.props.getData} />
            : null}
          {this.state.sort === 'location'
            ? <InventoryLocation 
                userId={this.props.userId}
                itemList={this.props.items}
                getData={this.props.getData}
                deleteItem={this.deleteItem} />
            : null}
      </div>
    )
  }
}

export default ManageInventory;