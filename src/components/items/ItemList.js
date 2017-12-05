import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import ItemEntry from './ItemEntry';


class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: this.props.match.params.collectionId.slice(1),
      collectionName:'',
      items:[['id', {photoUrls: 'add Item!', name: 'add Item!'}]],
    }
    this.getItemData = this.getItemData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  componentDidMount() {
    this.getItemData()
  }

  getItemData() {
    let collectionId = this.props.match.params.collectionId.slice(1);
    new Promise((resolve, reject) => {
      collection.child(collectionId).on('value', (snap) => {
        return resolve(snap.val())
      })
    })
    .then((collectionObj) => {
      this.setState({collectionName: collectionObj.name})
      return Object.keys(collectionObj.itemId);
    })
    .then((itemIdArr) => {
      var arr = [];
      itemIdArr.forEach(id => {
        var tempPromise = new Promise((resolve, reject) => {
          item.child(id).on('value', function(snap) {
            resolve([id, snap.val()])
          })
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    })
    .then(data => {
      if (data[0] !== null && data[1]!== null){
        this.setState({items: data})
      }
    })
  }

  deleteItem(clickedItemId) {
    let collectionId = this.props.match.params.collectionId.slice(1);
    item.child(clickedItemId).remove()
    collection.child(collectionId + '/itemId').child(clickedItemId).remove()
    this.getItemData()
  }

  checkUser(clickedItemId, clickedItemUser) {
    if(firebaseAuth().currentUser.uid === clickedItemUser) {
      this.deleteItem(clickedItemId)
    }else {
      console.log('user athentication fail')
    }
  }

  render() {
    if(this.props.match.params.collectionId.slice(1) !== this.state.params) {
      this.setState({items:[['id', {photoUrls: 'add Item!', name: 'add Item!'}]]});
      this.getItemData();
      this.setState({params: this.props.match.params.collectionId.slice(1)});
    }
    console.log(this.state.items)
    return(
      <div>
        <h2>{this.state.collectionName}</h2>
        
        {this.state.items.map((itemArr) => {
          return <ItemEntry item={itemArr[1]} key={itemArr[0]} id={itemArr[0]} checkUser={this.checkUser} />
        })}
      </div>
    )
  }
}

export default ItemList;