import React from 'react';
import {InstantSearch, SearchBox, Hits, Highlight, Pagination } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

function foundItem({hit}) {
  console.log('HIT',hit)
  // console.log('should be state passed',this.props)
  console.log('window',window.indexName);
  return(
    <div>
      {window.indexName === 'item' &&
      (<div style={{display:"grid"}} onClick={(e)=> console.log('this is what the click handler passes: ', hit)}>
        <img src={hit.imageUrl}/>
        {hit.name}
      </div>)}

      {window.indexName === 'users' &&
        (<div>
        <img src={hit.profileInfo.profilePhoto}/>
        {hit.profileInfo.username}
      </div>)}

      {window.indexName === 'collection' &&
        (<div>
        <img src={hit.profileInfo.profilePhoto}/>
        {hit.profileInfo.username}
      </div>)}

      {window.indexName === 'category' &&
        (<div>
        <img src={hit.profileInfo.profilePhoto}/>
        {hit.profileInfo.username}
      </div>)}

    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
 // function Search() {
  export function Search() {
    return (
      <div>
        <Hits hitComponent={foundItem} />
        <div style={{float: "center"}}>
        <Pagination showLast={true} />
        </div>
      </div>
    )
  }

export class SearchHits extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <header className="searchBar">
        <SearchBox translations={{placeholder:'Search items'}} />
      </header>
    )
  }
}
