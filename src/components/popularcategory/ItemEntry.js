import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, ImageHeader } from "react-simple-card";

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    console.log(this.props.item)
    return(
      <div>
        <Card>
        <CardBody>
          <ImageHeader imageSrc={ this.props.item.images } />       
          <h3>{ this.props.item.title }</h3>
          { this.props.item.notes } 
        </CardBody>
        </Card>
      </div>
    )
  }
}

export default ItemEntry;