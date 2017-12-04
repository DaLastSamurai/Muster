import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import ItemEntry from './ItemEntry';


class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collectionName:'',
      items:[['id', {photoUrls: 'notworking', name: 'notworking'}]],
    }
    this.getItemData = this.getItemData.bind(this)
  }

  componentDidMount() {
    this.getItemData()
    console.log('data rerender?', this.state)
  }

  // componentWillMount() {
  //   this.getItemData()
  // }

  getItemData() {
    let collectionId = this.props.match.params.collectionId.slice(1);
    new Promise((resolve, reject) => {
      collection.child(collectionId).on('value', (snap) => {
        return resolve(snap.val())
      })
    })
    .then((collectionObj) => {
      // console.log('collectionobj',collectionObj)
      this.setState({collectionName: collectionObj.name})
      return Object.keys(collectionObj.itemId);
    })
    .then((itemIdArr) => {
      // console.log('itemidarr', itemIdArr)
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
      if (data[0] && data[1]){
        this.setState({items: data})
      }
    })
  }

  render() {
    console.log('this is state of item',this.state.items)
    return(
      <div>
        <h2>{this.state.collectionName}</h2>
        
        {this.state.items.map((itemArr) => {
          // console.log('itemarr', itemArr)
          return <ItemEntry item={itemArr[1]} key={itemArr[0]} />
        })}
      </div>
    )
  }
}

export default ItemList;