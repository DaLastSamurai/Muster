import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
      <div>
        <img src={this.props.item.imageUrl} /> 
        <h4>{this.props.item.name}</h4>
      </div>
    )
  }
}

export default ItemEntry;