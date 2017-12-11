import React from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import InventoryCategoryList from './InventoryCategoryList';

class InventoryCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      node: [],
    }
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
    this.getNodes = this.getNodes.bind(this);
    // this.handleDrag = this.handleDrag.bind(this);
  }
 
  componentDidMount() {
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
        collection.child(clickedEl).child('categoryId').set(targetId)
        let updates = {};
        let collectionName = this.props.collectionList[clickedEl]['name'];
        updates['/category/' + targetId + '/collectionId/' + clickedEl] = collectionName;
        firebase.database().ref().update(updates);
        category.child(sourceId).child('collectionId').child(clickedEl).remove()
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
        <h4>sort by category</h4>
        {this.props.categoryList
          ? Object.keys(this.props.categoryList).map((catName) => {
              return <InventoryCategoryList 
                key={catName}
                catName={catName}
                category={this.props.categoryList[catName]}
                collectionList={this.props.collectionList}
                getNodes={this.getNodes}
              />
            })
          : console.log('no category in your account')}
      </div>
    )
  }
}

export default InventoryCategory;