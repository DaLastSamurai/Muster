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
  }

  dragulaDecorator(componentBackingInstance){
    let drake = Dragula(componentBackingInstance).on('drop', function() {
      console.log('drop', drake.target)
      
    })
    console.log('sss',this.drake)
    drake.start(componentBackingInstance)
  
  };

  getNodes(n) {
    this.setState({node: this.state.node.push(n)})
  }

  shouldComponentUpdate(nextState) {
    if(this.State !== nextState) {
      this.dragulaDecorator(this.state.node)
      return true;
    }
    return false;
  }
  
  render() {
    return(
      <div>
        <h4>sort by collection</h4>
        {Object.keys(this.props.collectionList).map((colKey) => {
          return <InventoryCollectionList key={colKey} collection={this.props.collectionList[colKey]} itemList={this.props.itemList} getNodes={this.getNodes} />
        })}
      </div>
    )
  }
}

export default InventoryCollection;