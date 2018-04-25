import React from 'react';
import * as firebase from 'firebase';
import NewCollectionsInput from '../userBar/NewCollectionsInput.jsx';
import Collections from './Collections';

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ''
    };
  }

  componentDidMount() {
    let currentUID = this.props.userId;

    this.setState({
      uid: currentUID
    });
  }

  render() {
    console.log(event);
    return (
      <div className="additems-container">
        <div className="additems-forms">
          <NewCollectionsInput />
          <Collections userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default AddItems;
