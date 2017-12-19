import React from 'react';

class InventoryCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
 
  componentDidMount() {
  }
  
  render() {
    return(
        this.props.collection
        ? <div className={`${this.props.colKey} inventory-item`}>
            <div className="manage-item-image">
              <img src= {this.props.collection.photoUrl ? this.props.collection.photoUrl : 'https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'}/>
            </div>
            <p className="manage-item-itemtitle">{this.props.collection.name}</p>
            <div className="manage-item-decoline">
            </div>
          </div> 
        : <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
    )
  }
}

export default InventoryCategoryEntry;