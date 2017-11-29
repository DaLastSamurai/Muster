import React from 'react';

export default class MyCollectionsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  render() {
    // console.log(this.props.collectionName)
    return(
      <div>
      <h5>
        {this.props.collectionName}
      </h5>
        category: {this.props.category},
        description: {this.props.description},
        collection started in: {this.props.yearAdded}
      </div>
    )
  }
}
