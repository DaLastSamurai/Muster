import React from 'react';
import InventoryLocationEntry from './InventoryLocationEntry';

class InventoryLocationList extends React.Component {
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
          <h4>{this.props.location}</h4>
        </div>
        <div className="manage-item-container">
          <div className="manaage-item-list-box">
            <div className={`${this.props.location} dragulaContainer`} ref='node'>
            {this.props.itemList
            ? Object.keys(this.props.itemList).filter((id) => {
              return this.props.itemList[id]['location'] === this.props.location
            }).map((itemKey) => {
                // console.log('need to be filtered',this.props.itemList[itemKey], this.props.location)
                return <InventoryLocationEntry 
                  key={itemKey} 
                  itemId={itemKey} 
                  itemInLocation={this.props.itemList[itemKey]}
                  deleteItem={this.props.deleteItem}
                  editItem={this.props.editItem}/>
            })
            : console.log(`no item in ${this.props.location}`)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InventoryLocationList;

