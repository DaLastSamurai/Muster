import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';
import MapContainer from '../Map/MapContainer.jsx'


function foundItem({hit}) {
  console.log('running running?')
  return(
    <div /*onClick={(e)=> console.log('this is what the click handler passes: ', hit)}*/> 
      {window.indexName === undefined && (
      <div>
          {hit.author !== ""? /* check if it's book or 'item'*/
            <div> 
              
            <Link to={ `/items/:${ hit.collectionId }` }>
              { hit.images ? (<img className="card-size-images" src={ hit.images }/>) : (<img className="card-size-images" src={ hit.imageUrl }/>) }
              { hit.title ? (<div>{ hit.title }</div>) : (<div>{ hit.name })</div>) }
            </Link>

              { hit.price ? <div> ${hit.price} </div> :<div> price upon request </div> }
              { hit.savedKeywords ? 
                <p className="search-text"> 
                  Tags : { hit.savedKeywords.map((tag, index)=> {return <a className="tags" key={index}> { tag } </a>}) } 
                </p> 
              : null }
              <br />
            </div> 
            : null
          }
        </div>
      )}

      {window.indexName === 'item' && (
        <div>
        {/* only show books */}
          {hit.author !== ""?
            <div> 
              
            <Link to={ `/items/:${hit.collectionId}` }>
              <img className="card-size-images" src={ hit.imageUrl} />
              { hit.name } <br />
            </Link>

            { hit.price ? <div> ${hit.price} </div> :<div> price upon request </div> }
            { hit.savedKeywords ? <p className="search-text"> Tags : { hit.savedKeywords.map((tag)=> {return <a className="tags"> { tag } </a>}) } </p> : null }
            </div> 
            : null
          }
        </div>
      )}

      {window.indexName === 'users' &&
        (<div>
          <Link to={ `/profile/`+ `${hit.objectID}` }>
            <img className="card-size-images" src={ hit.profileInfo.profilePhoto } />
            { hit.profileInfo.username }
          </Link>
      </div>) }

      {window.indexName === 'category' &&
          (<div>
          <Link to={ `/collections/:` + `${ hit.objectID }` }>
            { hit.objectID }
          </Link>
      </div>) }
    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
  function Search(props) {
    console.log(props)
    return (
      <div className="search-container">
        <div className="search-list-container">
          <div className="search-entry">
            <Hits hitComponent={foundItem} />
          </div>
        </div>
        <div className="search-map">
          <MapContainer 
          hits={JSON.stringify(props)}
          />
        </div>
      </div>
    )
  }
export default connectHits(Search); //place through higher order function


export class SearchHits extends React.Component {
  render() {
    return (
      <header className="searchBar">
      <div>
        <SearchBox translations={{placeholder:'Search'}} />
      </div>
      </header>
    )
  }
}
