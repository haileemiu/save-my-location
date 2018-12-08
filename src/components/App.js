import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const defaultLocation = { latitude: 44.977753, longitude: -93.265015 }

class App extends Component {
  state = {
    listOfLocations: [],
  }

  componentDidMount() {
    this.showLocationList()
  }

  // Click event handler for getting geolocation
  getLocation = () => {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      const options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.showLocation,
        this.errorHandler,
        options,
      );
    } else {
      console.log('Sorry, browser does not support geolocation!');
    }
  }

  // Success callback for getCurrentPosition
  showLocation = (position) => {
    const { latitude, longitude } = position.coords;

    // Store to local state
    this.setState((state) => {
      return { listOfLocations: [{ latitude, longitude, created: (new Date()).toISOString() }, ...state.listOfLocations] }
    });

    this.addLocationToDb(position.coords);
  }

  // Call on click of "Where Am I?" button
  addLocationToDb = ({ latitude, longitude }) => {
    axios({
      method: 'POST',
      url: '/location',
      data: { latitude, longitude }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  // Error callback for getCurrentPosition
  errorHandler = (err) => {
    if (err.code === 1) {
      console.log('Error: Access is denied!');
    } else if (err.code === 2) {
      console.log('Error: Position is unavailable!');
    }
  }

  // 
  showLocationList = () => {
    axios({
      method: 'GET',
      url: '/location'
    }).then((response) => {
      console.log(response.data); // FOR DEV

      const location = response.data.map((item) => {
        return {latitude: item.coordinates.x, longitude: item.coordinates.y, created: item.created}
      })

      this.setState((state) => {
        return { listOfLocations: [...state.listOfLocations, ...location] }
      });
    }).catch((error) => {
      console.log('Error in getting locations:', error);
    })
  }


  render() {
    let center;
    console.log(this.state)
    if (this.state.listOfLocations[0]) {
      center = {
        lat: this.state.listOfLocations[0].latitude,
        lng: this.state.listOfLocations[0].longitude
      };
    }

    return (
      <>
        <h1>Save My Location</h1>

        <button onClick={this.getLocation} type="button">Where am I?</button>
        <div style={{ marginBottom: '50%', height: '2rem' }}>
          <Map
            google={this.props.google}
            initialCenter={{
              lat: defaultLocation.latitude,
              lng: defaultLocation.longitude
            }}
            center={center}
            zoom={15}
            style={{ height: '50%', width: '100%' }}
          >
            {this.state.listOfLocations[0] ?
              <Marker
                position={center}
              /> : null
            }
          </Map>
        </div>
        {/* List of places I have been */}
        <p>Previous Locations</p>
        <ul>
          {this.state.listOfLocations.map((location) =>
            <li key={location.created}>
              ({location.latitude}, {location.longitude}) 
            </li>
          )}
        </ul>

      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('')
})(App)
