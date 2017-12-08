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
        <div className={`${this.props.collectionId}`} ref='node'>
        {this.props.collection.itemId 
        ? Object.keys(this.props.collection.itemId).map((id) => {
          return <InventoryCollectionEntry key={id} itemId={id} itemInCol={this.props.itemList[id]} />
        })
        : console.log(`no item in ${this.props.collection.name}`)}
        </div>
      </div>
    )
  }
}

export default InventoryCollectionList;