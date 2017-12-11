import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';

function foundItem({hit}) {
  console.log(hit.objectID)
  return(
    <div>
      {window.indexName === 'item' &&
      (<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
        <Link to={`/items/:${hit.collectionId}`}>
          {hit.name}
          <img src={hit.imageUrl}/>
          Price : {hit.price}
          <br/>
        </Link>
      </div>)}

      {window.indexName === 'users' &&
        (<div onClick={(e)=> console.log('this is what the users click handler passes: ', hit)}>
          <Link to={`/profile/`+ `${hit.objectID}`}>
            {hit.profileInfo.username}
            <img src={hit.profileInfo.profilePhoto}/>
          </Link>
      </div>)}

      {window.indexName === 'category' &&
          (<div onClick={(e)=> console.log('this is what the category click handler passes: ', hit)}>
          <Link to={`/collections/` + `${hit.objectID}`}>
            {hit.objectID}
          </Link>
      </div>)}

      {(<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
          <Link to={`/items/:${hit.collectionId}`}>
            {hit.name}
            <img src={hit.imageUrl}/>
            {/* Price : {hit.price} */}
            <br/>
          </Link>
        </div>)}
    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
  function Search() {
    return (
      <div>
        <Hits hitComponent={foundItem} />
        <div style={{float: "center"}}>
        <Pagination showLast={true} />
        <HitsPerPage
        defaultRefinement={5} 
        items={[{value: 5, label: 'Show 5 hits'}, {value: 20, label: 'Show 20 hits'}]}
        />
        </div>
      </div>
    )
  }

//place through higher order function
export default connectHits(Search);

export class SearchHits extends React.Component {
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

