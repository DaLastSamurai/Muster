import React from 'react';
import CollectionEntry from './CollectionEntry';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';


class CollectionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryName:'',
      collections: null,
      test:[1,2,3,4]
    }
  }

  componentDidMount() {
    let categoryId = this.props.match.params.categoryId.slice(1);
    let getCollectionList = new Promise((resolve, reject) => {
      category.child(categoryId).on('value', (snap) => {
        let categoryObj = snap.val();
        this.setState({categoryName: categoryObj.name})
        return resolve(Object.keys(categoryObj.collectionId));
      })
    }).then((colIds) => {
      let obj = [];
      colIds.map((id) => {
        collection.child(id).on('value', function(snap) {
          obj.push(snap.val())
        })
      })
      return obj
    }).then((data) => {
      this.setState({collections: data})
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }
    return false;
  }

  render() {
    console.log('collections',this.state.collections)
    return(
      <div>
        <h2>{this.state.categoryName}</h2>
        {this.state.collections ? 
          this.state.collections.map((colObj) => {
            return <Link to={`/items/:collectionId`}><CollectionEntry collection={colObj}/></Link>
          } ) : 
          <h5>add collection</h5>}
      </div>
    )
  }
}

export default CollectionList;