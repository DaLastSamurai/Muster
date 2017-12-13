import React from 'react';
import InventoryCollectionEntry from './InventoryCollectionEntry';

import EditCollection from './EditCollection';

class InventoryCollectionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEdit: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }
 
  componentDidMount() {
    let node = this.refs.node;
    this.props.getNodes(node)
  }

  toggleEdit() {
    this.setState({showEdit: !this.state.showEdit})
  }
  
  render() {
    return(
      <div>
        <h4>{this.props.collection.name}</h4>
        <button onClick={() => {
          this.props.deleteCollection(this.props.collectionId, this.props.collection.itemId)
          }}> x </button>
        <button onClick={this.toggleEdit}>edit</button>
        {this.state.showEdit === true ? <EditCollection collection={this.props.collection} /> : null}
        <div className={`${this.props.collectionId} dragulaContainer`} ref='node'>
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
    )
  }
}

export default InventoryCollectionList;