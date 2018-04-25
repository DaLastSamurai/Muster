import React from 'react';
import * as firebase from 'firebase';
import NewCollectionsInput from '../userBar/NewCollectionsInput.jsx';
import Collections from './Collections';

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      collection: '',
      collectionId: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      uid: this.props.userId
    });
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log('state of collection ID:', this.state);
    return (
      <div className="additems-container">
        <div className="additems-forms">
          <div>
            <p>{JSON.stringify(this.state.uid)}</p>
            <p>{JSON.stringify(this.state.collection)}</p>
            <p>{JSON.stringify(this.state.collectionId)}</p>
            <p>{JSON.stringify(this.state.value)}</p>
          </div>
          <NewCollectionsInput />
          <Collections userId={this.props.userId} handler={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default AddItems;
