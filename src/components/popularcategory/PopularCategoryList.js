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
    console.log('these are the props in PopularCategoryList',this.props)
    return(
      <div style={{display: 'inline-block'}} className="container-fluid">
        <h2>Popular Categories</h2>
        <div>
          {Object.keys(this.props.popularCategoryList)
            .map((key) => {
              return (
                <div>
                  <PopularCategoryEntry
                    category={this.props.popularCategoryList[key]}
                    id={key}
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
{/*<div>
  {console.log('test', this.test())}
    {this.checkIfFavCatContains(key)
    ?(<button value={key} onClick={this.handleDislike}>Unlike</button>)
    :(<button value={key} onClick={this.handleLike}>Like!</button>)
  }
</div>*/}
