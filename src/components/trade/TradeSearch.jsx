import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';

function foundItem({hit}) {
  console.log('INDEXNAME',window.indexName)
  return(
    <div>
    {window.indexName === undefined &&
        (<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
          {/* <Link to={`/items/:${hit.collectionId}`}> */}
            {hit.name}
          {/* </Link> */}
            <br/>
      </div>)}

      {window.indexName === 'item' &&
      (<div onClick={()=> window.selectedItem = [hit.objectID, hit]}>
        {/* <Link to={`/items/:${hit.collectionId}`}> */}
          {hit.name}
        {/* </Link> */}
          <br/>
      </div>)}

      {window.indexName === 'users' &&
        (<div onClick={()=> window.selectedItem = [hit.objectID, hit]}>
          {/* <Link to={`/profile/`+ `${hit.objectID}`}> */}
            {hit.profileInfo.username}
          {/* </Link> */}
      </div>)}

      {window.indexName === 'category' &&
          (<div onClick={()=> window.selectedItem = [hit.objectID, hit]}>
          {/* <Link to={`/collections/:` + `${hit.objectID}`}> */}
            {hit.objectID}
          {/* </Link> */}
      </div>)}


    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
export function Search() {
    return (
      <div>
        <div style={{float: "center"}}>
        <Hits hitComponent={foundItem} />
        <br/>
        <Pagination showLast={true} />
        <br/>
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
        <SearchBox translations={{placeholder:'Search Me!'}} />
      </header>
    )
  }
}

