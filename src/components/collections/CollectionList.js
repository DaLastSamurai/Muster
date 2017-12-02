import React from 'react';
import CollectionEntry from './CollectionEntry';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';


class CollectionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryName:'',
      collections: [{photoUrl: 'notworking', name: 'notworking'}],
      test:[1,2,3,4]
    }
    this.changeCollection = this.changeCollection.bind(this);
  }

  componentDidMount() {
    let categoryId = this.props.match.params.categoryId.slice(1);
    new Promise((resolve, reject) => {
      category.child(categoryId).on('value', (snap) => {
        return resolve(snap.val())
      })
    }).then((categoryObj) => {
      this.setState({categoryName: categoryObj.name})
      return Object.keys(categoryObj.collectionId)
    }).then((collectionIdArr) => {
      var arr = [];
      collectionIdArr.forEach(id => {
        var tempPromise = new Promise((resolve, reject) => {
          collection.child(id).on('value', function(snap) {
            resolve(snap.val())
          })
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    }).then(data => this.setState({collections: data}))
  }
  
  changeCollection(data) {
    this.setState({
      collections: [{photoUrl: 'no', name: 'notw'}]
    })
  }

  render() {
    console.log('collections',this.state.collections)
    let stuff = this.state.collections.map((colObj) => {
      console.log('??', colObj)
        return <CollectionEntry collection={colObj}/>
      } )
    return(
      <div>
        <h2>{this.state.categoryName}</h2>
        {stuff}
      </div>
    )
  }
}

export default CollectionList;