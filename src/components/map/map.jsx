import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { compose, withProps } from "recompose"

// const MyMapComponent = withScriptjs(withGoogleMap((props)=>
//     <GoogleMap
// 				defaultZoom={8}
// 				defaultCenter={{lat:-34.397, lng:150.644}}
// 		>
// 		{props.isMarkerShown && <Marker position={{lat:-34.397, lng:150.644}} onClick={props.onMarkerClick}/>}
// 		</GoogleMap>
// ))

// <MyMapComponent 
// 	isMarkerShown
// 	googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />

// class Map extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {

// 		};
// 	}
// 	componentDidMount() {
// 		// gmap.checkResize()
// 		// google.maps.event.trigger(map, 'resize');
// 	}

// 	render() {
// 		const markers = this.props.markers || [];
// 		return (
// 			<GoogleMap
// 				defaultZoom={3}
// 				defaultCenter={{ lat:-25.363882, lng:131.044922 }}
// 				 >
// 				{/* <Marker position={{ lat: -34.397, lng: 150.644 }}/> */}
// 				{markers.map((marker, index) => (
//                 <Marker {...marker} />
// 				))}

// 			</GoogleMap>
// 		)
// 	}
// }

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)

export default Map
