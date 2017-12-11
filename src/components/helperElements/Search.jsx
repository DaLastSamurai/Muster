import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Pagination, HitsPerPage, InfiniteHits } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
// import { connectHits } from 'react-instantsearch/connectors';
function foundItem({hit}) {
  // console.log(hit)
  return(
    <div>
      {window.indexName === 'item' &&
      (<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
        {hit.name}
        <img src={hit.imageUrl}/>
        Price : {hit.price}
        <br/>
      </div>)}

      {window.indexName === 'users' &&
        (<div onClick={(e)=> console.log('this is what the users click handler passes: ', hit)}>
        {hit.profileInfo.username}
        <img src={hit.profileInfo.profilePhoto}/>
      </div>)}

      {window.indexName === 'category' &&
        (<div onClick={(e)=> console.log('this is what the category click handler passes: ', hit)}>
        {hit.objectID}
      </div>)}

      {(<div onClick={(e)=> console.log('this is what the item click handler passes: ', hit)}>
        {hit.name}
        <img src={hit.imageUrl}/>
        {/* Price : {hit.price} */}
        <br/>
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
        <Pagination showLast={true} />
        <HitsPerPage
        defaultRefinement={5} 
        items={[{value: 5, label: 'Show 5 hits'}, {value: 20, label: 'Show 20 hits'}]}
        />
        </div>
      </div>
    )
  }

  // export const CustomHits = connectHits(({ hits }) =>
  // <div>
  //   {hits.map(hit =>
  //     <p key={hit.objectID}>
  //       <Highlight attributeName="description" hit={hit} />
  //     </p>
  //   )}
  // </div>
  // );
  

// export class CustomHits extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render(){
//     console.log(this.props)
//     return(
//       <div>
//         {this.props.hits.map((hit)=> {
//           <p key={hit.objectID} />
//           }
//         )}
//       </div>
//     )}
// }

export class SearchHits extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('searchHits', this.props)
    return (
      <header className="searchBar">
        <SearchBox translations={{placeholder:'Search Me!'}} />
      </header>
    )
  }
}
