import React from 'react';
import { firebaseAuth, rootRef, collection} from '../../../config/firebaseCredentials';
import MyCollectionsEntry from './MyCollectionsEntry.jsx';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

export default class MyCollectionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.collectionList).map((id) => {
          return <div key={id}>
            <Link to={`/items/:${this.props.collectionList[id]}`} >
              <MyCollectionsEntry
                categoryId={this.props.collectionList[id].categoryId}
                name={this.props.collectionList[id].name}
                publicCat={this.props.collectionList[id].publicCat}
                id={id}
              />
            </Link>
          </div>
        })}
      </div>
    )
  }
}
