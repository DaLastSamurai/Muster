import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import CollectionList from '../collections/CollectionList';
import PopularCategoryEntry from './PopularCategoryEntry';

// PopularCategoryList sends props to 
  //PopularCategoryEntry
// PopularCategoryList recieves props from
  // App

export default class PopularCategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
    
    }
  }

  render() {
    // console.log('these are the props in PopularCategoryList',this.props)
    return(
      <div style={{display: 'inline-block'}} className="container-fluid">
        <h2>Popular Categories</h2>
        <div>
          {Object.keys(this.props.popularCategoryList)
            .map((id) => {
              return (
                <div key={id}>
                  <PopularCategoryEntry
                    category={this.props.popularCategoryList[id]}
                    id={id}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}