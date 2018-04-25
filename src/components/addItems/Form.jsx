import React from 'react';
import * as firebase from 'firebase';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.props.handler(event);
  }

  render() {
    return (
      <div>
        <div>
          <label>Title</label>
          <div>
            <input
              name="title"
              component="input"
              type="text"
              placeholder=""
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label>Author</label>
          <div>
            <input
              name="author"
              component="input"
              type="text"
              placeholder=""
              value={this.state.author}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label>Notes</label>
          <div>
            <input
              name="notes"
              component="input"
              type="text"
              placeholder=""
              value={this.state.notes}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Subject</label>
          <div>
            <input
              name="subject"
              component="input"
              type="text"
              placeholder=""
              value={this.state.subject}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>UPC</label>
          <div>
            <input
              name="upc"
              component="input"
              type="text"
              placeholder=""
              value={this.state.upc}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Online Price</label>
          <div>
            <input
              name="onlinePrice"
              component="input"
              type="text"
              placeholder=""
              value={this.state.onlinePrice}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Your Selling Price</label>
          <div>
            <input
              name="price"
              component="input"
              type="text"
              placeholder=""
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <div>
            <label>For Sale?</label>
            <input
              name="sell"
              id="sell"
              component="input"
              type="checkbox"
              value={this.state.sell}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
