import React from 'react';
import { firebaseAuth, rootRef, collection} from '../../../config/firebaseCredentials';
import MyCollectionsEntry from './MyCollectionsEntry.jsx';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

export default class MyCollectionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  render() {
    return (
      <div>
        {this.props.collectionList.map((collection) => {
          return <div key={collection[0]}>
            <Link to={`/items/:${collection[0]}`} >
              <MyCollectionsEntry
                categoryId={collection[1].categoryId}
                name={collection[1].name}
                publicCat={collection[1].publicCat}
                id={collection[0]}
              />
            </Link>
            <button onClick={() => {this.props.deleteCollection(collection[0])}}> x </button>
          </div>
        })}
      </div>
    )
  }
}
