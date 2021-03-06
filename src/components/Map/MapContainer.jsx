import React from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import Map from './Map.jsx'

export default class MapContainer extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
				userLoc : {lat : 40.7504733, lng:-73.9765122 }, //set default center to Manhattan
			}
			this.onGetCurrentLocationSuccess = this.onGetCurrentLocationSuccess.bind(this);
			this.onGetCurrentLocationFail = this.onGetCurrentLocationFail.bind(this);
		}

		onGetCurrentLocationSuccess (position) {
			console.log('onGetCurrentLocationSuccess')
			this.setState({userLoc : {lat : position.coords.latitude, lng: position.coords.longitude}});
		}

		onGetCurrentLocationFail () {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		componentDidMount() {
			if (navigator.geolocation) {
				/* geolocation is available */
				navigator.geolocation.getCurrentPosition(this.onGetCurrentLocationSuccess, this.onGetCurrentLocationFail);
			}
		}

		render() {
			// console.log('map container props: ' + this.props.hits)
			// console.log('map container should be array / obj',JSON.parse(this.props.hits))
			// console.log(this.state.userLoc)
			return(
					<div>
						<h2 className="map-header">Find by Location</h2>
						<div className="map-wrap">
							<Map
								userLoc={this.state.userLoc}
								hits={JSON.parse(this.props.hits)}
								containerElement={<div style={{ height: `400px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCvQC9D22yi5n1gEdQka4j0MdDu2cq95dM"
								loadingElement={<div style={{ height: '100%' }} />}
							/>
						</div>
					</div>
			)
		}
}