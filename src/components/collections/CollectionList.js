import React from 'react';
import CollectionEntry from './CollectionEntry';

class CollectionList extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
      <div>
        {this.props.clickedCollectionList.map((colObj, i) => {
          let colKey = Object.keys(colObj);
          return <CollectionEntry collection={colObj[colKey]} key={colKey} />
        }
        )}
      </div>
    )
  }
}

export default CollectionList;