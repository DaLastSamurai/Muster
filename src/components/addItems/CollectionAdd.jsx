import React from 'react';
import * as firebase from 'firebase';

class CollectionAdd extends React.component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleAddCollection = this.handleAddCollection.bind(this);
  }

  handleAddCollection() {
    this.props.getUserCollection();
  }

  render() {
    return <div />;
  }
}

export default CollectionAdd;
