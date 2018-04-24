import React from 'react';
import * as firebase from 'firebase';

class Location extends React.component {
  constructor(props) {
    super(props);
    this.state = {};

    this.geoFindMe = this.geoFindMe.bind(this);
    this.geoAddName = this.geoAddName.bind(this);
    this.handleGeoChange = this.handleGeoChange.bind(this);
  }

  handleGeoChange(event) {
    event.preventDefault();
    let obj = event.target.value;
    this.setState({
      _geoloc: obj
    });
  }

  //Gets user geolocation
  geoFindMe() {
    var output = document.getElementById('out');
    if (!navigator.geolocation) {
      output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
      return;
    }
    output.innerHTML = '<p>Locating…</p>';
    navigator.geolocation.getCurrentPosition(
      position => {
        var x = position.coords.latitude;
        var y = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + x + '° <br>Longitude is ' + y + '°</p>';

        // var img = "https://maps.googleapis.com/maps/api/staticmap?center=" + x + "," + y + "&zoom=17&size=400x400&sensor=false";

        this.setState({
          _geolocPosition: { lat: x, lng: y }
          // _geolocImage: img
        });
      },
      () => {
        output.innerHTML = 'Unable to retrieve your location';
      }
    );
  }
  geoAddName() {
    let updates = {};
    updates['/users/' + this.props.userId + '/locations/' + this.state._geolocName] = this.state._geolocPosition;

    return firebase
      .database()
      .ref()
      .update(updates);
  }

  render() {
    return (
      <div>
        <div>
          <label>Location</label>
          <div>
            <select
              className="form-control"
              name="_geoloc"
              component="select"
              value={this.state._geoloc}
              onChange={this.handleGeoChange}
            >
              <option />
              {this.state.locationList.map(location => {
                let locationObj = {};

                locationObj['lng'] = location.lng;
                locationObj['lat'] = location.lat;
                locationObj['name'] = location.name;

                // let locationJSON = JSON.stringify(location)
                // let reparsedObj = JSON.parse(locationJSON)
                return <option value={JSON.stringify(locationObj)}> {location.name}</option>;
              })}
            </select>
          </div>
        </div>

        <a onClick={this.geoFindMe}>Use my current location</a>

        {this.state._geolocPosition ? (
          <div id="out">
            {/* <img src={this.state._geolocImage}/>     */}

            <div>
              <label>Name of Location</label>
              <div>
                <input
                  className="form-control"
                  name="_geolocName"
                  component="text"
                  placeholder=""
                  value={this.state._geolocName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <a onClick={this.geoAddName}>Save to Location List</a>
          </div>
        ) : (
          <div id="out" />
        )}
      </div>
    );
  }
}

export default Location;
