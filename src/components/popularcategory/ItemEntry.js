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
    console.log('item',this.props.id)
    return(
      <div>
        <div onClick={this.toggleDetail}>
          <Card>
          <CardBody>
            <ImageHeader imageSrc={ this.props.item.images } />       
            <h3>{ this.props.item.title }</h3>
            { this.props.item.notes } 
          </CardBody>
          </Card>
        </div>
        {this.state.showDetail ? <ImageModel item={this.props.item} toggleDetail={this.toggleDetail} /> : null}
      </div>
    )
  }
}

export default ItemEntry;