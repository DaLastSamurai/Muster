import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSearches : [],
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

  toggleInfo() {

  }

  render() {
    // const markers = this.props.filteredSearches || [];
    // console.log(this.props.userLoc ? 'yes' : 'no');
    console.log(this.state.filteredSearches)
    return (
      <div>
        <GoogleMap
          defaultZoom={12}
          center={this.props.userLoc}
          defaultCenter={{ lat:-30.363882, lng:150.044922 }}          
          >
          {this.state.filteredSearches.map((itemLoc)=>{
            return <div>
              <Marker position={itemLoc._geoloc}/>

              <InfoWindow onCloseClick={()=>{this.toggleInfo}}
                defaultPosition={itemLoc._geoloc}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
              >

                <div style={{ backgroundColor: `white`, opacity: 0.5, padding: `6px` }}>
                  <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    {itemLoc.title}
                   
                  </div>
                </div>

              </InfoWindow>
              </div>
          })}
        </GoogleMap>
      </div>
    )
  }
}
export default withScriptjs(withGoogleMap(Map))


