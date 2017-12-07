import React from 'react';
import Dragula from 'react-dragula';
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
    console.log('inv collllllll com did mount',this.props.collectionList)
    // let nodes = Object.keys(this.props.collectionList).map((colKey) => {
    //   console.log('dididid', colKey)
    //   return colKey = this.refs.colKey
    // })
    // this.dragulaDecorator(nodes)
  }

  dragulaDecorator(componentBackingInstance){
    if (componentBackingInstance) {
      let options = {};
      Dragula(componentBackingInstance, options).on('drag', function() {
        console.log('dragging')
      })
    }
  };

  getNodes(n) {
    this.setState({node: this.state.node.push(n)})
    // console.log('nodeeeee', n)
    // console.log('aaaaaa//',this.state.node)
  }

  shouldComponentUpdate(nextState) {
    if(this.State !== nextState) {
      this.dragulaDecorator(this.state.node)
      // console.log('ppppp',this.state.node)
      return true;
    }
    return false;
  }
  
  render() {
    return(
      <div>
        <h4>sort by collection</h4>
        {Object.keys(this.props.collectionList).map((colKey) => {
          // console.log('colKey inv col',colKey)
          return <InventoryCollectionList key={colKey} collection={this.props.collectionList[colKey]} itemList={this.props.itemList} getNodes={this.getNodes} />
        })}
      </div>
    )
  }
}

export default InventoryCollection;