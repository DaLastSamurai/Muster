import React from 'react';
import * as firebase from 'firebase';
import ImageUpload from '../helperElements/imageUploader';

class AddItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boughtFrom: '',
      collectionId: '',
      location: '',
      name: '',
      notes: '',
      imageUrl: '',
      price: '',
      productIds: '',
      purchaseTime: '',
      sell: '',
      uId: '',
      collectionList: [['', 'loading collections...']]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImageState = this.setImageState.bind(this);
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  };

  setImageState(imageUrl) {
    this.state.imageUrl = imageUrl;
  };

  handleChange(event) {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    firebase.database().ref('/item').push(this.state)
    event.target.reset();
  };

  componentDidMount() {
    var collectionRef = firebase.database().ref('/collection');
    collectionRef.on("value", (snapshot) => {

      var grabIdName = Object.keys(snapshot.val()).map((k, i) => {
        return [Object.keys(snapshot.val())[i], snapshot.val()[k].categoryId]
      });

      this.setState({ collectionList: grabIdName });

      }, (error) => {console.error(error)}
    );
  }

  render() {
    // console.log('THIS.STATE:', this.state)
    return (
      <div className="col-sm-4 col-sm-offset-4">

        <ImageUpload setImageState = {this.setImageState}/>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">


            <div>
              <label>Name</label>
              <div>
                <input
                  className="form-control"
                  name="name"
                  component="input"
                  type="text"
                  placeholder="name..."
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Image URL</label>
              <div>
                <input
                  className="form-control"
                  name="imageUrl"
                  component="input"
                  type="text"
                  placeholder="http://"
                  value={this.state.imageUrl}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>


            <div>
              <label>Collection</label>
              <div>
                <select
                  className="form-control"
                  name="collectionId"
                  component="select"
                  value={this.state.collectionId}
                  onChange={this.handleChange}
                  required
                >
                  {this.state.collectionList.map(collection =>
                    <option value={collection[0]}>{collection[1]}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label>Notes</label>
              <div>
                <input
                  className="form-control"
                  name="notes"
                  component="text"
                  placeholder="notes..."
                  value={this.state.notes}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Price</label>
              <div>
                <input
                  className="form-control"
                  name="price"
                  component="input"
                  type="text"
                  placeholder="$1.00"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Location</label>
              <div>
                <input
                  className="form-control"
                  name="location"
                  component="input"
                  type="text"
                  placeholder="current location?"
                  value={this.state.location}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Bought From</label>
              <div>
                <input
                  className="form-control"
                  name="boughtFrom"
                  component="input"
                  type="text"
                  placeholder="where did you buy this from?"
                  value={this.state.boughtFrom}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              <label>Amazon Link</label>
              <div>
                <input
                  className="form-control"
                  name="productIds"
                  component="input"
                  type="text"
                  placeholder="https://www.amazon.com/..."
                  value={this.state.productIds}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              <label>Purchase Date</label>
              <div>
                <input
                  className="form-control"
                  name="purchaseTime"
                  component="input"
                  type="text"
                  placeholder="where did you buy this?"
                  value={this.state.purchaseTime}
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

            <div>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>

      </div>
    )
  }
};

export default AddItems;
