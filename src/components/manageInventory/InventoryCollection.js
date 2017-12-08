import React from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import InventoryCollectionList from './InventoryCollectionList';

class InventoryCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      node: [],
    }
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
    this.getNodes = this.getNodes.bind(this);
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
    //   invalid: function (el, handle) {
    //     return false; // don't prevent any drags from initiating by default 
    //   }
      // copy: false,                       // elements are moved by default, not copied 
    // // copySortSource: false,             // elements in copy-source containers can be reordered 
    // // revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true 
    // // removeOnSpill: false,              // spilling will `.remove` the element, if this is true 
    // mirrorContainer: document.body    // set the element that gets mirror elements appended 
    // // ignoreInputTextSelection: true     // allows users to select input text, see details below gu-transit  
    };
    if(componentBackingInstance) {
      let drake = Dragula(componentBackingInstance, option)
      .on('drop', function(el, target, source) {

        let clickedEl = el.className.slice(0, -11);
        let tempObj = {}
        tempObj[clickedEl] = clickedEl;
        console.log('drop', 'clicked el', clickedEl,'moved to ', target.className, 'coming from', source.className)
        item.child(clickedEl).child('collectionId').set(target.className)
        collection.child(source.className).child('itemId').child(clickedEl).remove()
        collection.child(target.className).child('itemId').update(tempObj)
      })
    }
    
  };

  getNodes(n) {
    this.setState({node: this.state.node.push(n)})
  }

  shouldComponentUpdate(nextState) {
    if(this.State !== nextState) {
      this.dragulaDecorator(this.state.node)
      // console.log('nodess', this.state.node)
      return true;
    }
    return false;
  }
  
  render() {
    return(
      <div>
        <h4>sort by collection</h4>
        {Object.keys(this.props.collectionList).map((colKey) => {
          return <InventoryCollectionList 
            key={colKey} 
            collectionId={colKey}
            collection={this.props.collectionList[colKey]} 
            itemList={this.props.itemList} 
            getNodes={this.getNodes} />
        })}
      </div>
    )
  }
}

export default InventoryCollection;