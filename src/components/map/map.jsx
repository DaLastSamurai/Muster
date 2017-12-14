import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
  }

  render() {
    const markers = this.props.markers || [];
    return (
      <div>

        <GoogleMap
          defaultZoom={3}
          defaultCenter={{ lat:-25.363882, lng:131.044922 }}
          >
          {/* <Marker position={{ lat: -34.397, lng: 150.644 }}/> */}
          {markers.map((marker, index) => (
                  <Marker {...marker} />
          ))}
        </GoogleMap>
      </div>
    )
  }
}
export default withScriptjs(withGoogleMap(Map))


