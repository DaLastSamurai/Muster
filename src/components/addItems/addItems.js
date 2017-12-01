import React from 'react';

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boughtFrom: '',
      collectionId: '',
      location: '',
      name: '',
      notes: '',
      photoUrls: '',
      price: '',
      productIds: { amazon: '', ebay: '' },
      purchaseTime: '',
      sell: '',
      uId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    alert(JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div>
          <label>Name</label>
          <div>
            <input
              name="name"
              component="input"
              type="text"
              placeholder="name..."
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Photo URL</label>
          <div>
            <input
              name="photoUrls"
              component="input"
              type="text"
              placeholder="http://"
              value={this.state.photoUrls}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Collection</label>
          <div>
            <select
              name="collectionId"
              component="select"
              value={this.state.collectionId}
              onChange={this.handleChange}
            >
              <option />
              <option value="0">Sohee's Board Games</option>
              <option value="1">Yusaku's 1992 IMPEL MARVEL UNIVERSE SERIES</option>
            </select>
          </div>
        </div>

        <div>
          <label>Notes</label>
          <div>
            <input
              name="notes"
              component="textarea"
              placeholder="notes..."
              value={this.state.notes}
              onChange={this.handleChange} />
          </div>
        </div>

        <div>
          <label>For Sale?</label>
          <div>
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

        <div>
          <label>Price</label>
          <div>
            <input
              name="price"
              component="input"
              type="text"
              placeholder="$1.00"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Location</label>
          <div>
            <input
              name="location"
              component="input"
              type="text"
              placeholder="where"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>
        </div>


        <input type="submit" value="Submit" />

      </form>
    )
  }
}

export default AddItems;