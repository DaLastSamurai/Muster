import React from 'react';

class CollectionEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    console.log('>>>',this.props.collection)
    return(
      <div>
        {this.props.collection}
        <img src={this.props.collection.photoUrl}/>
        <h4>{this.props.collection.name}</h4>
      </div>
    )
  }
}

export default CollectionEntry;