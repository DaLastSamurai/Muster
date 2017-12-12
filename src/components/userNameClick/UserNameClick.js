import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class UserNameClick extends React.Component {
  constructor(props) {
    super(props)
  
  }

  render() {
    return(
      <div>
        <p>Profile</p>
        <p>Collections</p>
        <p>Trade</p>
      </div>
    )
  }
}

export default UserNameClick;