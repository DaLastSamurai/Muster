import React from 'react';

// generic component for link buttons. Used multple times, very straightforward.
// takes an optional argument for type. 
export default class LinkButton extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    if(typeof this.props.clickFunction(e) !== 'undefined') {
      // console.log('invoked this.props.clickFunction: ', this.props.clickFunction(e));
      this.props.clickFunction(e).then(data => data)
    }
  }

  render() {
   return (
      <li type={this.props.type || "button"} className="btn btn-outline-secondary bg-primary" onClick={this.handlePress}>
        {this.props.title}
      </li>
    )
  }
}
