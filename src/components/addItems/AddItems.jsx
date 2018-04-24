import React from 'react';
import * as firebase from 'firebase';
import UserInfo from '../userBar/UserInfo.jsx';
import NewCollectionsInput from '../userBar/NewCollectionsInput.jsx';
import Collections from './collections.js';

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="additems-container">
        <div className="additems-forms">
          <NewCollectionsInput />
          <Collections />
        </div>
      </div>
    );
  }
}

export default AddItems;
