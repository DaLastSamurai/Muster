import React from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import Map from './Map.jsx'
import Search from '../helperElements/Search.jsx'

export default class MapContainer extends React.Component {
    constructor() {
        super();
        this.state = {}
		}

		componentDidMount() {
		}


		render() {
			return(
					<div>
						<h2>Find by Location</h2>
						<Map 
								containerElement={<div style={{ height: `400px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.29&key=AIzaSyCvQC9D22yi5n1gEdQka4j0MdDu2cq95dM"
								loadingElement={<div style={{ height: '100%' }} />}
						/>
						<div>
						<Search />
							</div>
					</div>
			)
		}
}