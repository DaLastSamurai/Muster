import React from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import InventoryLocationList from './InventoryLocationList';

class InventoryLocation extends React.Component {
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
        console.log('drag on', clickedEl, targetId, sourceId)
        item.child(clickedEl).child('location').set(targetId)
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
        <h4>sort by location</h4>
        {Object.keys(this.props.itemList).length > 0 
          ? [...new Set(Object.keys(this.props.itemList).map((itemKey) => {
              return this.props.itemList[itemKey]['location']
            }))].map((location) => {
              return <InventoryLocationList
                key={location}
                location={location}
                itemList={this.props.itemList}
                getNodes={this.getNodes}
                deleteItem={this.props.deleteItem} />
            })
          : console.log('no items in your account')}
      </div>
    )
  }
}

export default InventoryLocation;