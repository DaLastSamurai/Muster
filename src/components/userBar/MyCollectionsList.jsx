import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials';
import DummyData from './DummyData.js'
import MyCollectionsEntry from './MyCollectionsEntry.jsx';

export default class MyCollectionsList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){

  }

  render() {
    // console.log(DummyData)
    return (
      <div>
        {DummyData.map((collection) => {
          return <MyCollectionsEntry
          collectionName={collection.collectionName}
          category={collection.category}
          description={collection.description}
          yearAdded={collection.yearAdded}
          />
        })}
      </div>
    )
  }
}
