import React from 'react';

class ImageModel extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {console.log('model', this.props.item)
    return(
      <div className="image-model">
        <div className="image-model-info">
          <div onClick={this.props.toggleDetail}
               className="exit-button">
            <p>x</p>
          </div>
          <div className="image-model-info-innerbox">
              <img src={this.props.item.images[0]}/>
            <h3>title</h3>
            <div></div>
            <p>{this.props.item.title}</p>
            <h3>subject</h3>
            <div></div>
            <p>{this.props.item.subject}</p>
            <h3>notes</h3>
            <div></div>
            <p>{this.props.item.notes}</p>
            <h3>price</h3>
            <div></div>
            <p>{this.props.item.price}</p>
            <h3>online price</h3>
            <div></div>
            <p>{this.props.item.onlinePrice}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageModel;