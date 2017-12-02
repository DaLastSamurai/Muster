import React from 'react';

export default class MyCollectionsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  render() {
    return(
      <div>
        <h5>
          {this.props.name}
        </h5>
      </div>
    )
  }
}
