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
          <a href={this.props.name}>{this.props.name}</a>
        </h5>
      </div>
    )
  }
}
