import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

function foundItem({hit}) {
  // console.log(hit.savedKeywords)
  console.log('INDEXNAME',window.indexName)
  return(
    <div>
      {window.indexName === undefined &&
        (<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit, hit.objectID)}>
            {hit.name}<br/>
            <br/>
        </div>)}
      {window.indexName === 'item' &&
      (<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
          {hit.name}<br/>
          <br/>
      </div>)}

      {window.indexName === 'users' &&
        (<div onClick={(e)=> console.log('this is what the users click handler passes: ', hit)}>
            {hit.profileInfo.username}
      </div>)}

      {window.indexName === 'category' &&
          (<div onClick={(e)=> console.log('this is what the category click handler passes: ', hit)}>
            {hit.objectID}
      </div>)}


    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
export function Search() {
    return (
      <div>
        <Hits hitComponent={foundItem} />
        <div style={{float: "center"}}> 
        <HitsPerPage
        defaultRefinement={5} 
        items={[{value: 5, label: 'Show 5 hits'}, {value: 20, label: 'Show 20 hits'}]}
        />
      </div>
      </div>
    )
  }

//place through higher order function

export class TradeSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="searchBar">
        <SearchBox translations={{placeholder:'mmmmmmmmm search me'}} />
      </header>
    )
  }
}

