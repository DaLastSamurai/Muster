import React from 'react';
import * as firebase from 'firebase';

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionList: [{ id: 1, name: 'programming' }, { id: 2, name: 'comic books' }],
      collectionId: ''
    };
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

  componentDidMount() {
    //Checks database for collections owned by the user
    let collectionRef = firebase.database().ref('/collection');

    collectionRef.on('value', snapshot => {
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
        .filter(collection => collection.uid && collection.uid[0] === this.props.userId);

      console.log(grabIdName);

      this.setState({ collectionList: grabIdName });
    });
  }

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
            placeholder="select collection..."
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
