import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import CategoryEntry from './CategoryEntry';

// PopularCategoryList recieves props from
  // App(state.popularCategoryList)
// PopularCategoryList sends props to 
  //PopularCategoryEntry

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      collection: [],
      photo: null,
    }
    this.getRandomCategoryImage = this.getRandomCategoryImage.bind(this);
  }

  componentDidMount() {
    collection.on("value", (snap) => {
      this.setState({collection : snap.val()})
    })
  }

  getRandomCategoryImage(colsInCat) {
    new Promise((resolve, reject) => {
      resolve(Object.keys(colsInCat)[0])
    })
    .then((collectionId) => {
      console.log(this.state.collection[collectionId].photoUrl)
    })
  }

  render() {
    return(
        <div className="container-fluid popular-category-container">
          <h2>Popular Categories</h2>
          <div className="popular-category-container">
            <div className="popular-category-list">
              {Object.keys(this.props.popularCategoryList).map((id) => {
                let collectionKey = Object.keys(this.props.popularCategoryList[id][1].collectionId)[0]
                console.log(this.props.popularCategoryList[id][1].collectionId[0])
                // this.getRandomCategoryImage(this.props.popularCategoryList[id][1].collectionId) //pass this category's collectionIds
                  return (
                    <div key={id}>
                      <CategoryEntry
                        category={this.props.popularCategoryList[id]}
                        id={id} />
                    </div>
                    )
                })
              }
            </div>
          </div>
        </div>
    )
  }
}
export default CategoryList;


