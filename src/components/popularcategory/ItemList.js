import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import ItemEntry from './ItemEntry';

//if collection params.pop is 1 === sort by category
//if collection params.pop is 2 === sort by person
class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: this.props.match.params.collectionId.slice(1),
      collectionName:'',
      userInfo: null,
      items:[],
      rerender: null,
    }
    this.getItemData = this.getItemData.bind(this);
  }

  componentDidMount() {
    this.getItemData()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.match.params.collectionId.slice(1) !== nextProps.match.params.collectionId.slice(1)) {
      this.setState({params: this.props.match.params.collectionId.slice(1)}, () => {
        this.getItemData()
      });
    }
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
      if (collectionObj.itemId) {
        return Object.keys(collectionObj.itemId);
      } else {
        this.setState({items: []})
      }
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
    .catch((error) => {
      console.log('no item in collection')
    })
    .then((itemArr) => {
      let userId = itemArr[0][1]['uid'];
      users.child(userId).on('value', (snap) => {
        this.setState({userInfo: snap.val()})
      })
      return itemArr
    })
    .then(data => {
      if (data[0] !== null && data[1]!== null){
        this.setState({items: data})
      }
    })
  }

  render() {
    return(
      this.state.items.length > 0 && this.state.userInfo
      ? <div>
          <h2>{this.state.collectionName}</h2>
          <p>{this.state.userInfo.profileInfo.username}</p>
          {this.state.items.map((itemArr) => {
            return <ItemEntry item={itemArr[1]} key={itemArr[0]} id={itemArr[0]} />
          })}
        </div>
      : 'add item'
    )
  }
}

export default ItemList;