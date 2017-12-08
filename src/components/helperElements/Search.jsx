import React from 'react';
import {InstantSearch, SearchBox, Hits, Highlight} from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

function foundItem({hit}) {
  console.log('HIT',hit)
  return(
    <div style={{display:"grid"}}>
      <img src={hit.imageUrl}/>
      {hit.name}
    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
 // function Search() {
  export function Search(props) {
    return (
      <div>
        <Hits hitComponent={foundItem} />
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
        <SearchBox translations={{placeholder:'Search something'}} />
      </header>
    )
  }
}
