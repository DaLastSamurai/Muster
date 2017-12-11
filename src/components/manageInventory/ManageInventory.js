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
  }
 
  componentDidMount() {
  }

  handleSortBy(e) {
    this.setState({sort: e.target.value})
  }
//>>>>>>when page out get data
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
            collectionList={this.props.collections} 
            itemList={this.props.items}
            getData={this.props.getData} /> 
          <InventoryCategory 
            userId={this.props.userId}
            collectionList={this.props.collections}
            categoryList={this.props.categorys}
            getData={this.props.getData} />
          <InventoryLocation 
            userId={this.props.userId}
            itemList={this.props.items}
            getData={this.props.getData}/>
      </div>
    )
  }
}

export default ManageInventory;