import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
      <div>
        <img src={this.props.item.imageUrl ?  this.props.item.imageUrl : 'https://crestaproject.com/demo/nucleare-pro/wp-content/themes/nucleare-pro/images/no-image-box.png'} /> 
        <h4>{this.props.item.name}</h4>
        <a href={() => this.props.checkUser(this.props.id, this.props.item.uId)} type="button">x</a>
      </div>
    )
  }
}

export default ItemEntry;