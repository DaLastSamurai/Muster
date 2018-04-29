import React from 'react';
import NewCollectionsInput from '../userBar/NewCollectionsInput.jsx';
import Collections from './Collections';
import Form from './Form';
import Book from '../helperElements/Book';
import InProgressCarousel from './InProgressCarousel';

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
      price: '',
      sell: ''
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
      <div class="additems-wrapper">
        <article class="additems-preview">
          <p>Preview</p>
          <Book bookInfo={this.state} />
        </article>
        <aside class="aside aside-1">
          Scanned Books
          <InProgressCarousel setItemState={this.setItemState} currentUserId={this.props.userId} />
        </aside>
        <aside class="aside aside-2">
          Add/Edit Books
          <Collections userId={this.props.userId} handler={this.handleChange} />
          <Form handler={this.handleChange} />
        </aside>
      </div>
      // <div>
      //   {/* // <div className="additems-container"> */}
      //   <div className="main-container">
      //     <div className="float-reqbox">
      //       <h2>Add/Edit Book</h2>

      //       {/* <div className="additems-forms"> */}
      //       <div className="container-requset-form">
      //         <div className="request-form-box">
      //           <Collections userId={this.props.userId} handler={this.handleChange} />
      //           {/* <NewCollectionsInput /> */}
      //           <Form handler={this.handleChange} />
      //         </div>
      //       </div>
      //     </div>
      //     <div className="request-trans">
      //       <div className="reqmade">
      //         <div className="req-title">
      //           <h2>Preview</h2>
      //         </div>
      //         <Book bookInfo={this.state} />
      //       </div>
      //     </div>
      //   </div>

      //   <div className="float-reqbox">
      //     <InProgressCarousel setItemState={this.setItemState} currentUserId={this.props.userId} />
      //   </div>
      // </div>
    );
  }
}

export default AddItems;
