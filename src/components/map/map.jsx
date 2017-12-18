import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSearches : [],
      currentMarker : '',
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
    console.log('>>>>> map hits >>>>>>' + this.props.hits )
    this.setState({filteredSearches : this.props.hits.hits.filter((hit)=>{
      return hit._geoloc !== undefined})})
    }

  render() {
    // console.log(this.props.userLoc ? 'yes' : 'no');
    // console.log('this is filtered searches >>> ', this.state.filteredSearches)
    // console.log('current marker state >>> ', this.state.currentMarker)
    return (
      <div>
        <GoogleMap
          defaultZoom={14}
          center={this.props.userLoc}
          defaultCenter={{ lat:-30.363882, lng:150.044922 }}          
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
                {this.state.currentMarker.title}
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


