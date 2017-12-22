import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { Configure } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSearches : [],
      currentMarker : '',
      coordinates : null,
    };
  }
  componentDidMount() {
    // console.log('Map component should be array of hits', this.props.hits.hits)
    // console.log(Array.isArray(this.props.hits.hits))
    this.setState({filteredSearches : this.props.hits.hits.filter((hit)=>{
      return hit._geoloc !== undefined})
    })
  }

  componentWillReceiveProps() {
    this.setState({filteredSearches : this.props.hits.hits.filter((hit)=>{
      return hit._geoloc !== undefined})})
    }

  render() {
    // console.log(this.props.userLoc ? 'yes' : 'no');
    // console.log('this is filtered searches >>> ', this.state.filteredSearches)
    console.log('current marker state >>> ', this.state.currentMarker)
    return (
      <div>
      <Configure insideBoundingBox={[this.state.coordinates]} />    
        <GoogleMap
          onIdle={()=>this.setState({coordinates : [googleMap.getBounds().getNorthEast().lat(), googleMap.getBounds().getSouthWest().lng(), googleMap.getBounds().getSouthWest().lat(), googleMap.getBounds().getNorthEast().lng()]})}
          defaultZoom={14}
          center={this.props.userLoc}
          defaultCenter={{ lat:-30.363882, lng:150.044922 }}
          ref={(googleMap) => {window.googleMap = googleMap}}          
          >
          {this.state.filteredSearches.map((marker, index)=>{
            return <div>
              <Marker 
                ref={index}
                position={marker._geoloc}
                onMouseOver={()=>{
                  this.setState({currentMarker : marker })
                }}
                  
              />
          {this.state.currentMarker ? (
          <InfoWindow 
          position={{lat : this.state.currentMarker._geoloc.lat + 0.0001, lng : this.state.currentMarker._geoloc.lng}}
          >
            <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `0px` }}>
              <div style={{ fontSize: `12px`, fontColor: `#08233B` }}>
                <Link to={ `/items/:${ this.state.currentMarker.collectionId }` }>
                  {this.state.currentMarker.title}
                </Link>
              </div>
            </div>
          </InfoWindow>) 
          : (<div/>) }
              </div>
          })}
        </GoogleMap>
      </div>
    )
  }
}
export default withScriptjs(withGoogleMap(Map))


