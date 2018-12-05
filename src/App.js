import React, { Component } from 'react';
import './App.css';

class App extends Component {
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

    console.log(`Latitude : ${latitude} Longitude: ${longitude}`);
  }

  // Error callback for getCurrentPosition
  errorHandler = (err) => {
    if (err.code === 1) {
      console.log('Error: Access is denied!');
    } else if (err.code === 2) {
      console.log('Error: Position is unavailable!');
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Save My Location</h1>

        <button onClick={this.getLocation} type="button">Where am I?</button>

      </div>
    );
  }
}

export default App;
