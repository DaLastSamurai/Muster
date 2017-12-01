import React from 'react';
import PopularCategoryEntry from './PopularCategoryEntry';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import CollectionList from '../collections/CollectionList';

class PopularCategoryList extends React.Component {
  constructor() {
      super()
  }

  render() {
    return(
      <div>
          <div>popular list</div>
          <div>
            {Object.keys(this.props.popularCategoryList).map((popularCategory) => 
            <Link to='/collections'>
                <PopularCategoryEntry 
                  popularCategory={this.props.popularCategoryList[popularCategory]} 
                  handleClickFromPopularCat={this.props.handleClickFromPopularCat} 
                  id={popularCategory}
                  key={popularCategory}
                />
            </Link>
            )}
          </div>
      </div>
    )
  }
}

export default PopularCategoryList;