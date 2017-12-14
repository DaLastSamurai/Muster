import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSearches : [],
    };
  }
  componentDidMount() {
    console.log('Map component should be array of hits', this.props.hits.hits)
    // console.log(Array.isArray(this.props.hits.hits))
    this.setState({filteredSearches : this.props.hits.hits.filter((hit)=>{
      return hit._geoloc !== undefined})
    })
  }



  render() {
    // const markers = this.props.filteredSearches || [];
    return (
      <div>
        <GoogleMap
          defaultZoom={3}
          defaultCenter={{ lat:-25.363882, lng:131.044922 }}
          >
          {this.state.filteredSearches.map((itemLoc)=>{
            return <div><Marker position={itemLoc._geoloc}/></div>
          })}
        </GoogleMap>
      </div>
    )
  }
}
export default withScriptjs(withGoogleMap(Map))


