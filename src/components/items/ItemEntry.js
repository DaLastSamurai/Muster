import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    // console.log('itementry',this.props.item)
    return(
      <div>
        <img src={this.props.item.photoUrls} /> 
        {/* <h4>{this.props.item.name}</h4> */}
      </div>
    )
  }
}

export default ItemEntry;