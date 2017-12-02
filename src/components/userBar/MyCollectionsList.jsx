import React from 'react';
import { firebaseAuth, rootRef, collection} from '../../../config/firebaseCredentials';
import DummyData from './DummyData.js'
import MyCollectionsEntry from './MyCollectionsEntry.jsx';

export default class MyCollectionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionList:[],
    };
  }

  componentDidMount(){
    collection.orderByKey().limitToLast(10).on('value', snap => {
      let array = [];
      for(var key in snap.val()){
        array.push(snap.val()[key])
      }
      // console.log(array)
      this.setState({collectionList : array})
    })
  }

  render() {
    // console.log('THIS IS STATE',this.state.collectionList)
    return (
      <div>
        {this.state.collectionList.map((collection) => {
          return <MyCollectionsEntry
          categoryId={collection.categoryId}
          name={collection.name}
          publicCat={collection.publicCat}
          />
        })}
      </div>
    )
  }
}
