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
      <div>
        <h4>{this.props.catName}</h4>
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
    )
  }
}

export default InventoryCategoryList;