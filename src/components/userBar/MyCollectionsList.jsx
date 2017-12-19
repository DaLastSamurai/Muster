import React from 'react';
import { firebaseAuth, rootRef, collection} from '../../../config/firebaseCredentials';
import MyCollectionsEntry from './MyCollectionsEntry.jsx';

export default class MyCollectionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillReceiveProps() {
  }
  
  render() {
    return (
      <div>
        {this.props.collections ? (Object.entries(this.props.collections).map((collection) => {
          if(collection[1] !== null) {
          return <div key={collection} className="collectionList">
              <MyCollectionsEntry
                categoryId={collection[1].categoryId}
                name={collection[1].name}
                publicCat={collection[1].publicCat}
                photoUrl={collection[1].photoUrl}                
                collectionId={collection[0]}
              />
          </div>
        }})) : (<div/>)
      }
      </div>
    )
  }
}
