import React from 'react';
import firebase from 'firebase';
// import {users} from '../../../config/firebaseCredentials';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
// import { Card, CardHeader, CardBody, CardFooter, ImageHeader } from "react-simple-card";


class CollectionEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
    }
  }

  componentDidMount() {
    let colItemId = Object.keys(this.props.collection.itemId)[0];
    item.child(colItemId).child('images').on('value', (snap) => {
      this.setState({image: snap.val()})
    })
    
  }

  render() {
    return(
      <div>
          {this.state.image 
          ? <img className="card-size-images" src={this.state.image} />
          : <img className="card-size-images" src="http://www.aitwb.org/upload/centers_img/no-image-available.jpg"/>}
          <div className="category-overlay-text">
            <h4>{this.props.collection.name}</h4>
          </div>
      </div>
    )
  }
}
export default CollectionEntry;