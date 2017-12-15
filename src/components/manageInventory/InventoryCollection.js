import React from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import InventoryCollectionList from './InventoryCollectionList';
import { checkAuthStatus } from '../authentication/authenticationHelpers';

class InventoryCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      node: [],
      test:null,
    }
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
    this.getNodes = this.getNodes.bind(this);
  }

  dragulaDecorator(componentBackingInstance){
    let option = {
      isContainer: function (el) {
        return false; // only elements in drake.containers will be taken into account 
      },
    //   moves: function (el, source, handle, sibling) {
    //     return true; // elements are always draggable by default 
    //   },
    //   accepts: function (el, target, source, sibling) {
    //     return true; // elements can be dropped in any of the `containers` by default 
    //   },
    // invalid: function (el, handle) {
    //   return false; // don't prevent any drags from initiating by default 
    // }
      copy: false,                       // elements are moved by default, not copied 
      // copySortSource: false,             // elements in copy-source containers can be reordered 
      // revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true 
      // removeOnSpill: false,              // spilling will `.remove` the element, if this is true 
      // mirrorContainer: document.body    // set the element that gets mirror elements appended 
      // ignoreInputTextSelection: true     // allows users to select input text, see details below gu-transit  
    };

    if(componentBackingInstance) {
      let drake = Dragula(componentBackingInstance, option)
      .on('drop', (el, target, source) => {
        let clickedEl = el.className.split(' ')[0];
        let targetId = target.className.split(' ')[0];
        let sourceId = source.className.split(' ')[0];

        

        let p1 = new Promise((resolve, reject) => {
          resolve(item.child(clickedEl).child('collectionId').set(targetId))
        }) 
        let p2 = new Promise((resolve, reject) => {
          resolve(collection.child(sourceId).child('itemId').child(clickedEl).remove())
        }) 
        let p3 = new Promise((resolve, reject) => {
          let updates = {};
          updates['/collection/' + targetId + '/itemId/' + clickedEl] = clickedEl;
          resolve(firebase.database().ref().update(updates))
        }) 

        Promise.all([p1,p2,p3]).then(() => {
          // this.props.getData(this.props.userId)
        })

      })
    }
  };
  
  getNodes(n) {
    this.setState({node: this.state.node.push(n)})
    this.dragulaDecorator(this.state.node)
  }
  
  render() {
    return(
      <div>
        <h4>sort by collection</h4>
        {Object.keys(this.props.collectionList).length > 0 
          ? Object.keys(this.props.collectionList).map((colKey) => {
              return <InventoryCollectionList 
                key={colKey} 
                collectionId={colKey}
                collection={this.props.collectionList[colKey]} 
                itemList={this.props.itemList} 
                getNodes={this.getNodes}
                deleteCollection={this.props.deleteCollection}
                deleteItem={this.props.deleteItem} 
                editItem={this.props.editItem} />
            })
          : console.log('no collection in your account')}
      </div>
    )
  }
}

export default InventoryCollection;