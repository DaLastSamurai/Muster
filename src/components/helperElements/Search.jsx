import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';
import MapContainer from '../Map/MapContainer.jsx'


function foundItem({hit}) {
  // console.log(hit.savedKeywords)
  // console.log('INDEXNAME',window.indexName)
  // console.log(hit.collectionId)
  // console.log('has an image?',hit.images[0])
  return(
    <div>
      {window.indexName === undefined && (
      <div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
        <Link to={`/items/:${hit.collectionId}`}>
          <img src={hit.imageUrl}/>
          {hit.name}<br/>
        </Link>

          {hit.price ? <p> ${hit.price} </p> :<p> price upon request </p>}
          <br/>
          {hit.savedKeywords ? <p> Tags : {hit.savedKeywords} </p> : null}
          <br/>
        </div>
      )}

      {window.indexName === 'item' && (
        <div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
          <Link to={`/items/:${hit.collectionId}`}>
            <img src={hit.imageUrl}/>
            {hit.name}<br/>
          </Link>

          ${hit.price || 'message user'}<br/>
          {hit.savedKeywords ? <p> Tags : {hit.savedKeywords} </p> : null}
          <br/>
        </div>
      )}

      {window.indexName === 'users' &&
        (<div onClick={(e)=> console.log('this is what the users click handler passes: ', hit)}>
          <Link to={`/profile/`+ `${hit.objectID}`}>
            <img src={hit.profileInfo.profilePhoto}/>
            {hit.profileInfo.username}
          </Link>
      </div>)}

      {window.indexName === 'category' &&
          (<div onClick={(e)=> console.log('this is what the category click handler passes: ', hit)}>
          <Link to={`/collections/:` + `${hit.objectID}`}>
            {hit.objectID}
          </Link>
      </div>)}


    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
  function Search(props) {
    // console.log('props in Search:', props)
    return (
      <div>
        <Hits hitComponent={foundItem} />
        <div style={{float: "center"}}>
        <Pagination showLast={true} />
        <HitsPerPage
        defaultRefinement={5} 
        items={[{value: 5, label: 'Show 5 hits'}, {value: 20, label: 'Show 20 hits'}]}
        />
        <MapContainer hits={JSON.stringify(props)}/>
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

