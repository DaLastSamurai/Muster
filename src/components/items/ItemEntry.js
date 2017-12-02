import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    console.log('>>>',this.props.Item)
    return(
      <div>
        {this.props.item}
        <img src={this.props.item.photoUrl}/>
        <h4>{this.props.item.name}</h4>
      </div>
    )
  }
}

export default ItemEntry;