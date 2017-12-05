import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
      <div  >
        <img class="col-md-2"
          className='media-object' 
          src={this.props.item.imageUrl ? 
            this.props.item.imageUrl : 
            'https://crestaproject.com/demo/nucleare-pro/wp-content/themes/nucleare-pro/images/no-image-box.png'}
        /> 
        <p>{this.props.item.name}
          <a href={() => this.props.deleteItem(this.props.id)}> x</a></p>
      </div>
    )
  }
}

export default ItemEntry;