import React from 'react';
import PopularCategoryEntry from './PopularCategoryEntry';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import CollectionList from '../collections/CollectionList';

class PopularCategoryList extends React.Component {
  constructor(props) {
      super(props)
      this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
  }

  handleLike(e) {
    this.props.addToFavCat(e.target.value);
  }

  render() {
    console.log('popcatlist',this.props.popularCategoryList)
    return(
      <div style={{display: 'inline-block'}} className="container-fluid">
          <h2>popular categories</h2>
          <div>
            {Object.keys(this.props.popularCategoryList).map((key) => {
              return<div><Link to={`/collections/:${this.props.popularCategoryList[key][0]}`} key={key}>
                      <PopularCategoryEntry
                        category={this.props.popularCategoryList[key]} id={key} />
                    </Link>
                    <button value={key} onClick={this.handleLike}>Favorite!</button>
                    </div>
            })}
          </div>
      </div>
    )
  }
}

export default PopularCategoryList;
