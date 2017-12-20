import React from 'react';
import InventoryCollectionEntry from './InventoryCollectionEntry';

import EditCollection from './EditCollection';

class InventoryCollectionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEdit: false,
      display: true,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleDeleteCollection = this.handleDeleteCollection.bind(this);
  }
 
  componentDidMount() {
    let node = this.refs.node;
    this.props.getNodes(node)
    // console.log('????', this.props.collection.itemId)
  }

  handleDeleteCollection() {
    let answer = confirm('are you sure?');
    if (answer === true) {
      this.props.deleteCollection(this.props.collectionId, this.props.collection.itemId)
      this.setState({display: false})
    }
  }

  toggleEdit() {
    this.setState({showEdit: !this.state.showEdit})
  }
  
  render() {
    return(
      <div className="manage-inventory-sortby-item">
        <div className={`manage-item-title ${this.state.display ? null : "inventory-delete"}`}>
          <h4>{this.props.collection.name}</h4>
          <p onClick={() => {
            this.handleDeleteCollection()
            }}> x </p>
          <p onClick={this.toggleEdit}>edit</p>
          {this.state.showEdit === true ? <EditCollection collection={this.props.collection} /> : null}
        </div>
        <div className="manage-item-container">
          <div className="manaage-item-list-box">
            
            <div className={`${this.props.collectionId} dragulaContainer manaage-item-list`} ref='node'>
            {this.props.collection.itemId 
            ? Object.keys(this.props.collection.itemId).map((id) => {
              return <InventoryCollectionEntry
                key={id} 
                itemId={id} 
                itemInCol={this.props.itemList[id]} 
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem} />
            })
            : console.log(`no item in${this.props.collection.name}`)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InventoryCollectionList;