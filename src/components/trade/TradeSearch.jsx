import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';


//on click run some function that sets state to window and passes up 

function foundItem({hit}) {
  return(
    <div 
    onClick={(e)=>{window.selectedItem = [hit.objectID, hit];
    console.log('this is in search', window.selectedItem)}}
    >
      {window.indexName === undefined &&
        (<div> 
            {hit.name}<br/>
        </div>)}
      {window.indexName === 'item' &&
      (<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
          {hit.name}<br/>
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
export default function Search() {
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
  render() {
    return (
      <header className="searchBar">
        <SearchBox translations={{placeholder:'mmmmmmmmm search me'}} />
      </header>
    )
  }
}

console.log(window.selectedItem, 'selectedItem')
