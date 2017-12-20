import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';

function foundItem({ hit }) {
  // console.log('this is state in founditem', console.log(this))
  return(
    <div className="req-search-result" onClick={(e) => {
      e.preventDefault()
      window.setSelectedItemState(e.target.innerHTML, e.target)
      console.log('//////', window)
    } }>
    { window.indexName === undefined &&
        (<div>
          <p>
            { hit? hit.title : null }
          </p>
          <br/>
        </div>) }

      {window.indexName === 'item' &&
      (<div onClick={(e) => {
        e.preventDefault()
        window.setSelectedItemState(e.target.innerHTML)
      } }>
        <p>
          { hit? hit.title : null }
        </p>
        <br/>
      </div>) }

      {window.indexName === 'users' &&
        (<div onClick={(e) => {
          e.preventDefault()
          window.setSelectedItemState(e.target.innerHTML)
        } }>
          <p>
            { hit.profileInfo ? hit.profileInfo.username : null }
          </p>
      </div>) }

      {window.indexName === 'category' &&
          (<div onClick={(e) => {
            e.preventDefault()
            window.setSelectedItemState(e.target.innerHTML)
          } }>
          <p>
            { hit ? hit.objectID : null }
          </p>
      </div>) }


    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
function Search(props) {
    return (
      <div className="search-container">
        <div className="search-results-box" style={ { float: "center" } }>
        <Hits 
        hits={props.hits}
        hitComponent={ foundItem } />
        </div>
      </div>
    )
  }

export default connectHits(Search)

//place through higher order function

export class TradeSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="searchBar">
        <SearchBox translations={ { placeholder:'Search Me!' } } />
      </header>
    )
  }
}

