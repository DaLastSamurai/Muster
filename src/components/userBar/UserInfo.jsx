import React from 'react';
import { Link } from 'react-router'
import LinkButton from '../helperElements/LinkButton'
// need to change so that clicking on takes you to the profile page of the user

export default class UserInfo extends React.Component {
  constructor(props){
    super(props);
  }
  render() { 
    // console.log('this is the uid', this.props.user.uid)
    return (
      <div> 
        <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-128.png" />
        {this.props.user.displayName} 
      </div>
    )
  }
}
