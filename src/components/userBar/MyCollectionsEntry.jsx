import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

export default class MyCollectionsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  render() {
    return(
      <div>
        <h5>
        <Link to={`/items/:${this.props.collectionId}`} >
          {this.props? <a href={this.props.name}>{this.props.name}</a> : null }
        </Link>
        </h5>
      </div>
    )
  }
}
