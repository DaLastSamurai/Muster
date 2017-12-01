import React from 'react';
// clicking on this takes you to the profile page of the user.

export default class UserInfo extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return ( // change this to query the redux store with the user information in it. 
        <div><img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-128.png" />
        {this.props.user.displayName}</div>
      )
  }
}
