import React from 'react';
import { firebaseAuth, rootRef, collection} from '../../../config/firebaseCredentials';
import DummyData from './DummyData.js'
import MyCollectionsEntry from './MyCollectionsEntry.jsx';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

export default class MyCollectionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionList:[['key', {not: 'working'}]],
    };
  }

  componentDidMount(){
    collection.orderByKey().limitToLast(10).on('value', snap => {
      let array = [];
      for(var key in snap.val()){
        array.push([key ,snap.val()[key]])
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
          // console.log('collection form',collection)
          return <Link to={`/items/:${collection[0]}`} key={collection[0]}><MyCollectionsEntry
          categoryId={collection[1].categoryId}
          name={collection[1].name}
          publicCat={collection[1].publicCat}
          /></Link>
        })}
      </div>
    )
  }
}
