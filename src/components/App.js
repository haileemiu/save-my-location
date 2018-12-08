import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const defaultLocation = { latitude: 44.977753, longitude: -93.265015 };

class App extends Component {
  state = {
    listOfLocations: [],
  }

  componentDidMount() {
    this.getLocationList();
  }

  // Click event handler for getting geolocation
  getLocation = () => {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      const options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.getCurrentPositionSuccess,
        this.getCurrentPositionError,
        options,
      );
    } else {
      console.log('Sorry, browser does not support geolocation!');
    }
  }

  // Success callback for getCurrentPosition
  getCurrentPositionSuccess = (position) => {
    const { latitude, longitude } = position.coords;

    // Store to local state
    this.setState(state => ({
      listOfLocations: [
        {
          latitude,
          longitude,
          created: (new Date()).toISOString(),
        },
        ...state.listOfLocations,
      ],
    }));

    this.addLocation(position.coords);
  }

  // Error callback for getCurrentPosition
  getCurrentPositionError = (err) => {
    if (err.code === 1) {
      console.log('Error: Access is denied!');
    } else if (err.code === 2) {
      console.log('Error: Position is unavailable!');
    }
  }

  // Call on click of "Where Am I?" button
  addLocation = ({ latitude, longitude }) => {
    const request = {
      method: 'POST',
      url: '/location',
      data: { latitude, longitude },
    };

    axios(request)
      .then(this.addLocationSuccess)
      .catch(this.addLocationError);
  }

  // Success callback for adding location
  addLocationSuccess = (response) => {
    console.log(response);
  }

  // Error callback for adding location
  addLocationError = (error) => {
    console.log(error);
  }

  // Retrieves list of locations from the API
  getLocationList = () => {
    const request = {
      method: 'GET',
      url: '/location',
    };

    axios(request)
      .then(this.getLocationListSuccess)
      .catch(this.getLocationListError);
  }


  // Success callback from getting location list
  getLocationListSuccess = (response) => {
    const location = response.data.map(item => ({
      latitude: item.coordinates.x,
      longitude: item.coordinates.y,
      created: item.created,
    }));

    this.setState(state => ({ listOfLocations: [...state.listOfLocations, ...location] }));
  }

  // Error callback for getting location list
  getLocationListError = (error) => {
    console.log('Error in getting locations:', error);
  }

  render() {
    let center;

    if (this.state.listOfLocations[0]) {
      center = {
        lat: this.state.listOfLocations[0].latitude,
        lng: this.state.listOfLocations[0].longitude,
      };
    }

    return (
      <div className="App">
        <h1>Save My Location</h1>

        <button onClick={this.getLocation} type="button">Where am I?</button>
        <div style={{ position: 'relative', height: 600 }}>
          <Map
            google={this.props.google}
            initialCenter={{
              lat: defaultLocation.latitude,
              lng: defaultLocation.longitude,
            }}
            center={center}
            zoom={15}
          >
            {this.state.listOfLocations[0]
              ? (
                <Marker
                  position={center}
                />
              ) : null
            }
          </Map>
        </div>
        {/* List of places I have been */}
        <p>Previous Locations</p>
        <ul>
          {this.state.listOfLocations.map(location => (
            <li key={location.created}>
              ({location.latitude}, {location.longitude})
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_MAP_KEY),
})(App);
