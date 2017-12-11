import React from 'react';

class InventoryLocationEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
 
  componentDidMount() {
  }
  
  render() {
    return(
      this.props.itemInLocation ? 
      <div className={`${this.props.itemId}`}>
        <img src= {this.props.itemInLocation.imageUrl ? this.props.itemInLocation.imageUrl : 'https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'}/>
        <div>{this.props.itemInLocation.name}</div>
      </div> :
      <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
    )
  }
}

export default InventoryLocationEntry;