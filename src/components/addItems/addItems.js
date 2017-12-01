import React from 'react';
import * as firebase from 'firebase';

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
      uId: '',
      collectionList: [['', 'loading collections...']]
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

  componentDidMount() {
    var collectionRef = firebase.database().ref('/collection');
    collectionRef.on("value", (snapshot) => {
      // console.log('snapshot.val()', snapshot.val())

      var grabIdName = Object.keys(snapshot.val()).map((k, i) => {
        return [Object.keys(snapshot.val())[i], snapshot.val()[k].categoryId]
      });

      this.setState({ collectionList: grabIdName });

    }, (error) => {
      console.error(error);
    });
  }



  // function writeUserData(userId, name, email, imageUrl) {
  //   firebase.database().ref('users/' + userId).set({
  //     username: name,
  //     email: email,
  //     profile_picture: imageUrl
  //   });
  // }


  render() {
    console.log('COLLECTIONLIST:', this.state.collectionList)
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <form onSubmit={this.handleSubmit}>
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
                />
              </div>
            </div>

            <div>
              <label>Photo URL</label>
              <div>
                <input
                  className="form-control"
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
                  className="form-control"
                  name="collectionId"
                  component="select"
                  value={this.state.collectionId}
                  onChange={this.handleChange}
                >
                  <option />
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
                  component="textarea"
                  placeholder="notes..."
                  value={this.state.notes}
                  onChange={this.handleChange} />
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
                  placeholder="where"
                  value={this.state.location}
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
}

export default AddItems;