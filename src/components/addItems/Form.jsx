import React from 'react';
import * as firebase from 'firebase';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sell: false,
      trade: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
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

  handleSwitch(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: !this.state.sell
    });
    this.props.handler(event);
  }

  render() {
    return (
      <div>
        <div>
          {/* <label>Title</label> */}
          <div>
            <input
              name="title"
              component="input"
              type="text"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div>
          {/* <label>Author</label> */}
          <div>
            <input
              name="author"
              component="input"
              type="text"
              placeholder="Author"
              value={this.state.author}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div>
          {/* <label>Notes</label> */}
          <div>
            <input
              name="notes"
              component="input"
              type="text"
              placeholder="Notes"
              value={this.state.notes}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          {/* <label>Subject</label> */}
          <div>
            <input
              name="subject"
              component="input"
              type="text"
              placeholder="Subject"
              value={this.state.subject}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          {/* <label>UPC</label> */}
          <div>
            <input
              name="upc"
              component="input"
              type="text"
              placeholder="UPC/ISBN"
              value={this.state.upc}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          {/* <div>
            <label>For Sale?</label>
            <input
              className="switch round"
              name="sell"
              id="sell"
              component="input"
              type="checkbox"
              value={this.state.sell}
              onChange={this.handleChange}
            />
            
          </div> */}

          {/* <label>For Sale?</label>
          <label className="switch">
            <input
              type="checkbox"
              className="switch round"
              name="sell"
              id="sell"
              component="input"
              type="checkbox"
              value={this.state.sell}
              onChange={this.handleChange && this.setState({ forSale: !this.state.forSale })}
            />
            <span className="slider round" />
          </label>
        </div> */}

          <div>
            <label>For Sale?</label>
            <input
              name="sell"
              id="sell"
              component="input"
              type="checkbox"
              value={this.state.sell}
              onChange={this.handleSwitch}
            />
          </div>
        </div>

        {this.state.sell ? (
          <div>
            <div>
              {/* <label>Online Price</label> */}
              <div>
                <input
                  name="onlinePrice"
                  component="input"
                  type="text"
                  placeholder="Retail Price"
                  value={this.state.onlinePrice}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              {/* <label>Your Selling Price</label> */}
              <div>
                <input
                  name="price"
                  component="input"
                  type="text"
                  placeholder="Selling Price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Form;
