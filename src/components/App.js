import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class App extends Component {
  state = {
    currentLatitude: 45.428970,
    currentLongitude: -84.994059,
    listOfLocations: [],
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

    console.log(`Longitude: ${longitude} Latitude : ${latitude}`); // FOR DEV

    // Store to local state
    this.setState({ currentLatitude: latitude, currentLongitude: longitude });

    this.addLocationToDb();

  }

  // Call on click of "Where Am I?" button
  addLocationToDb = () => {
    axios({
      method: 'POST',
      url: '/location',
      data: { longitude: this.state.currentLatitude, latitude: this.state.currentLatitude }
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
  // showLocationList = () => {
  //   axios({
  //     method: 'GET',
  //     url: '/location'
  //   }).then((response) => {
  //     console.log(response.data); // FOR DEV
  //     // this.setState({ listOfLocations: response});
  //   }).catch((error) => {
  //     console.log('Error in getting locations:', error);
  //   })
  // }


  render() {
    return (
      <div className="App">
        <h1>Save My Location</h1>

        <button onClick={this.getLocation} type="button">Where am I?</button>
        {/* <button onClick={this.showLocationList} type="button">Where have I been?</button> */}
        {/* <div>{this.state.listOfLocations}</div> */}

        <Map
          google={this.props.google}

          center={{
            lat: this.state.currentLatitude,
            lng: this.state.currentLongitude
          }}
          zoom={15}

          style={{height: '75%', width: '75%'}}
        >

          <Marker

            position={{
              lat: this.state.currentLatitude,
              lng: this.state.currentLongitude
            }}
          />




        </Map>


      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('')
})(App)
