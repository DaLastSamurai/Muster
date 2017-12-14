import React from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import Map from './Map.jsx'

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
		}
		render() {
			// console.log('map container props: ' + this.props.hits)
			// console.log('map container should be array / obj',JSON.parse(this.props.hits))
			return(
					<div>
						<h2>Find by Location</h2>
						<Map 
								hits={JSON.parse(this.props.hits)}
								containerElement={<div style={{ height: `400px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.29&key=AIzaSyCvQC9D22yi5n1gEdQka4j0MdDu2cq95dM"
								loadingElement={<div style={{ height: '100%' }} />}
						/>
					</div>
			)
		}
}