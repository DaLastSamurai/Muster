import React from 'react';
import NewCollectionsInput from '../userBar/NewCollectionsInput.jsx';
import Collections from './Collections';
import Form from './Form';
import Book from '../helperElements/Book';

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      title: '',
      author: '',
      images: [],
      collection: '',
      collectionId: '',
      notes: '',
      upc: '',
      onlinePrice: '',
      storeLinks: {},
      subject: '',
      price: ''
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
    return (
      // <div className="additems-container">
      <div className="main-container">
        <div className="float-reqbox">
          <h2>Add/Edit Book</h2>

          {/* <div className="additems-forms"> */}
          <div className="container-requset-form">
            <div className="requset-form-box">
              <Collections userId={this.props.userId} handler={this.handleChange} />
              <NewCollectionsInput />
              <Form handler={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="request-trans">
          <div className="reqmade">
            <div className="req-title">
              <h2>Preview</h2>
            </div>
            <Book bookInfo={this.state} />
            <p>{JSON.stringify(this.state)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItems;
