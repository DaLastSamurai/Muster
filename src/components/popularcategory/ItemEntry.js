import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, ImageHeader } from "react-simple-card";

import ImageModel from '../model/ImageModel';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        showDetail: false,
      }
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail() {
    this.setState({showDetail: !this.state.showDetail})
  }

  render() {
    // console.log('item',this.props.id)
    return(
      <div className='popular-category'>
        <div onClick={this.toggleDetail}>
            <img className="card-size-images" src={this.props.item.images[0]}/>
            <div className="category-overlay-text">
            <h4>{ this.props.item.title }</h4>
            </div>
            {/* { this.props.item.notes } */}
        </div>
        {this.state.showDetail ? <ImageModel item={this.props.item} toggleDetail={this.toggleDetail} /> : null}
      </div>
    )
  }
}

export default ItemEntry;