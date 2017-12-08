import React from 'react';
import InventoryCollectionEntry from './InventoryCollectionEntry';

class InventoryCollectionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
 
  componentDidMount() {
    let node = this.refs.node;
    this.props.getNodes(node)
  }
  
  render() {
    return(
      <div>
        <h4>{this.props.collection.name}</h4>
        <div ref='node'>
        {this.props.collection.itemId 
        ? Object.keys(this.props.collection.itemId).map((id) => {
          return <InventoryCollectionEntry itemInCol={this.props.itemList[id]} />
        })
        : null }
        </div>
      </div>
    )
  }
}

export default InventoryCollectionList;