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
    // console.log('this props in manage inv', this.props)
  }
 
  componentDidMount() {
  }

  handleSortBy(e) {
    // console.log('sortt',(e.target.value))
    this.setState({sort: e.target.value})
    // console.log('from state', this.state.sort)
  }

  render() {
    return(
      <div>
        <select onChange={this.handleSortBy}>
          <option value="collection">by collection</option>
          <option value="location">by location</option>
          <option value="category">by category</option>
        </select>
          <InventoryCollection 
            userId={this.props.userId}
            collectionId={this.props.collectionId} 
            collectionList={this.props.collections} 
            itemList={this.props.items}
            getData={this.props.getData} /> 
      </div>
    )
  }
}

export default ManageInventory;

// {JSON.stringify(this.state.collections) !== "{}" && JSON.stringify(this.state.items) !== '{}' 
// ? <InventoryCollection collectionId={this.props.collectionId} collectionList={this.props.collections} itemList={this.props.items} /> 
// : 'loading'}