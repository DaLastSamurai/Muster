import React from 'react';
import ItemEntry from './ItemEntry';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';


class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // let categoryId = this.props.match.params.categoryId.slice(1);
    // new Promise((resolve, reject) => {
    //   category.child(categoryId).on('value', (snap) => {
    //     return resolve(snap.val())
    //   })
    // }).then((categoryObj) => {
    //   this.setState({categoryName: categoryObj.name})
    //   return Object.keys(categoryObj.collectionId)
    // }).then((collectionIdArr) => {
    //   var arr = [];
    //   collectionIdArr.forEach(id => {
    //     var tempPromise = new Promise((resolve, reject) => {
    //       collection.child(id).on('value', function(snap) {
    //         resolve([id, snap.val()])
    //       })
    //     })
    //     arr.push(tempPromise);
    //   })
    //   return Promise.all(arr);
    // }).then(data => this.setState({collections: data}))
  }

  render() {
    return(
      <div>
          ItemList
        {/* <h2>{this.state.categoryName}</h2>
        {this.state.collections ? this.state.collections.map((colObj) => {return <CollectionEntry collection={colObj}/>} ) : <h5>add collection</h5>} */}
      </div>
    )
  }
}

export default ItemList;