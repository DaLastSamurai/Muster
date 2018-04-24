import React from 'react';
import * as firebase from 'firebase';

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collectionList: [{ id: 1, name: 'programming' }, { id: 2, name: 'comic books' }] };
  }
  
  componentDidMount() {
    //Checks database for collections owned by the user
    let currentUser;
    let collectionRef = firebase.database().ref('/collection');
    collectionRef.on(
      'value',
      snapshot => {
        let currentUID = firebase.auth().currentUser.uid;
        currentUser = currentUID;
        // let currentUID = this.props.userId;
        let grabIdName = Object.keys(snapshot.val())
          .map((key, i) => {
            return {
              id: Object.keys(snapshot.val())[i],
              name: snapshot.val()[key].name,
              uid: snapshot.val()[key].uid,
              value: Object.keys(snapshot.val())[i],
              label: snapshot.val()[key].name
            };
          })
          .filter(collection => collection.uid.includes(currentUID));
        this.setState({
          collectionList: grabIdName,
          uid: currentUID
        });
        let locationRef = firebase.database().ref(`/users/${currentUID}/locations/`);

        locationRef.on('value', snapshot => {
          let grabLocations = Object.keys(snapshot.val()).map((key, i) => {
            return {
              lat: snapshot.val()[key].lat,
              lng: snapshot.val()[key].lng,
              name: key
            };
          });

          this.setState({
            locationList: grabLocations
          });
        });
      },
      error => {
        console.error(error);
      }
    );

  render() {
    return (
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
            <option />
            {this.state.collectionList.map(collection => <option value={collection.id}>{collection.name}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

export default Collections;
