import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { connectHits } from 'react-instantsearch/connectors';
import MapContainer from '../Map/MapContainer.jsx'


function foundItem({hit}) {
  // console.log(hit)
  return(
    <div> 
      {window.indexName === undefined && (
      <div onClick={ (e)=> console.log('this is what the item click handler passes: ', hit) }>
          {hit.author !== ""? /* check if it's book or 'item'*/
            <div> 
              
            <Link to={ `/items/:${ hit.collectionId }` }>
              { hit.images ? (<img className="card-size-images" src={ hit.images }/>) : (<img className="card-size-images" src={ hit.imageUrl }/>) }
              { hit.title ? (<div>{ hit.title }</div>) : (<div>{ hit.name })</div>) }
            </Link>

              { hit.price ? <div> ${hit.price} </div> :<div> price upon request </div> }
              { hit.savedKeywords ? 
                <p className="search-text"> 
                  Tags : { hit.savedKeywords.map((tag)=> {return <a className="tags"> { tag } </a>}) } 
                </p> 
              : null }
              <br />
            </div> 
            : null
          }
        </div>
      )}

      {window.indexName === 'item' && (
        <div onClick={ (e)=> console.log('this is what the item click handler passes: ', hit) }>
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
        (<div onClick={ (e)=> console.log('this is what the users click handler passes: ', hit) }>
          <Link to={ `/profile/`+ `${hit.objectID}` }>
            <img className="card-size-images" src={ hit.profileInfo.profilePhoto } />
            { hit.profileInfo.username }
          </Link>
      </div>) }

      {window.indexName === 'category' &&
          (<div onClick={(e)=> console.log('this is what the category click handler passes: ', hit) }>
          <Link to={ `/collections/:` + `${ hit.objectID }` }>
            { hit.objectID }
          </Link>
      </div>) }


    </div>
  )
}

//think of this as Search Result List component. it's like Search Result List Entry, maps and formats each found entry
  function Search(props) {
    // console.log('props in Search:', props)
    return (
      <div className="search-container">
        <div className="search-list-container">
          <div className="search-hits-per-page">
            <HitsPerPage
            defaultRefinement={5} 
            items={[{value: 5, label: 'Show 5 hits'}, {value: 20, label: 'Show 20 hits'}, {value:50, label: 'show 50'}]}
            />
          </div>

          <div className="search-entry">
            <Hits hitComponent={foundItem} />
          </div>

          <div className="pagination__container">
            <Pagination showLast={true} className="pagination-container"/>
          </div>
        </div>

        <div className="search-map">
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
      <div>
        <SearchBox translations={{placeholder:'Search'}} />
      </div>
      </header>
    )
  }
}
