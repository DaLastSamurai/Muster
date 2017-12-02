import React from 'react';
import PopularCategoryEntry from './PopularCategoryEntry';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import CollectionList from '../collections/CollectionList';

class PopularCategoryList extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
      <div>
          <h2>popular categories</h2>
          <div>
            {Object.keys(this.props.popularCategoryList).map((key) => {
              return<Link to={`/collections/:${key}`} key={key}>
                      <PopularCategoryEntry  
                        category={this.props.popularCategoryList[key]} id={key} />
                    </Link>;
            })}
          </div>
      </div>
    )
  }
}

export default PopularCategoryList;