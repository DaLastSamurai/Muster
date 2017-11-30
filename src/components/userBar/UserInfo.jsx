import React from 'react';

export default class UserInfo extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div><img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-128.png" />
        {this.props.user.displayName}</div>
      )
  }
}
