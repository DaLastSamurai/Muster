import React from 'react';

class ImageModel extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {console.log('model', this.props.item)
    return(
      <div className="image-model">
       <div onClick={this.props.toggleDetail}>x</div>
       <img src={this.props.item.images[0]}/>
       <h3>title</h3>
       <p>{this.props.item.title}</p>
       <h3>subject</h3>
       <p>{this.props.item.subject}</p>
       <h3>notes</h3>
       <p>{this.props.item.notes}</p>
       <h3>price</h3>
       <p>{this.props.item.price}</p>
       <h3>online price</h3>
       <p>{this.props.item.onlinePrice}</p>
      </div>
    )
  }
}

export default ImageModel;