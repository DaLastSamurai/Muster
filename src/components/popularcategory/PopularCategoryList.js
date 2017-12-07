import React from 'react';
import PopularCategoryEntry from './PopularCategoryEntry';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import CollectionList from '../collections/CollectionList';

class PopularCategoryList extends React.Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
  }

  render() {
    return(
      <div style={{display: 'inline-block'}} className="container-fluid">
          <h2>popular categories</h2>
          <div>
            {this.props.popularCategoryList.map((popularCategory) => {
              return<Link to={`/collections/:${popularCategory[0]}`} key={popularCategory[0]}>
                      <PopularCategoryEntry
                        category={popularCategory[1]} id={popularCategory[0]} />
                    </Link>
            })}
          </div>
      </div>
    )
  }
}

export default PopularCategoryList;
