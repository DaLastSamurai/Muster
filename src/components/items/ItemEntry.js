import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    // console.log('asdfasdf...',this.props.item)
    return(
      <div>
        <img src={this.props.item.imageUrl} /> 
        <h4>{this.props.item.name}</h4>
        {this.props.id === 'id' ? null : <a onClick={() => this.props.checkUser(this.props.id, this.props.item.uid)} type="button">x</a>}
      </div>
    )
  }
}

export default ItemEntry;