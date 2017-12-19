import React from 'react';
import InventoryCategoryEntry from './InventoryCategoryEntry';

class InventoryCategoryList extends React.Component {
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
      <div className="manage-inventory-sortby-item">
      <div className="manage-item-title">
        <h4>{this.props.catName}</h4>
        </div>
        <div className="manage-item-container">
          <div className="manaage-item-list-box">
        <div className={`${this.props.catName} dragulaContainer`} ref='node'>
        {this.props.category.collectionId
        ? Object.keys(this.props.category.collectionId).map((colKey) => {
          return <InventoryCategoryEntry 
            key={colKey} 
            colKey={colKey}
            collection={this.props.collectionList[colKey]}/>
          })
        : console.log(`no collection in ${this.props.category}`)}
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export default InventoryCategoryList;