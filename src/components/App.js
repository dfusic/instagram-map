import React, { Component } from 'react';
import MapComp from './Map';
import './App.css';
import ReactLoading from 'react-loading';

class App extends Component {
  state = {
    map: {
      longitude: '',
      latitude: '',
      foundUserLocation: false
    },
    feed: {
      hidden: false
    },
    cities: [
      {
        name: "London",
        lat: 51.5074,
        lon: 0.1278
      },
      {
        name: "Paris",
        lat: 40.7128,
        lon: 74.0060
      },
      {
        name: "Moscow",
        lat: 55.7558,
        lon: 37.6173
      },
      {
        name: "Hong Kong",
        lat: 22.3964,
        lon: 114.1095
      },
      {
        name: "Sydney",
        lat: 33.8688,
        lon: 151.2093
      }
    ]
  }
  componentDidMount(){
    // get user location from geolocation API
    // if browser supports geolocation
   
      // get current user position
    
    navigator.geolocation.getCurrentPosition((position)=>{
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({
        map: {
          longitude: longitude,
          latitude: latitude,
          foundUserLocation: true,
        },
        feed: {
          hidden: false
        }
      });
    },(error)=>{
      // random city on every load where the location is not specified
      // get random city latitude and longitude from the list
      let randNumb = Math.floor(Math.random() * this.state.cities.length);
      let latitude = this.state.cities[randNumb].lat;
      let longitude = this.state.cities[randNumb].lon;
      this.setState({
        map: {
          longitude: longitude,
          latitude: latitude,
          foundUserLocation: true,
        },
        feed: {
          hidden: false
        }
      });
    }, {
      // geolocator options
      enableHighAccuracy: true,
    })

    }

  render() {
    const map = this.state.map.foundUserLocation ? (
      <MapComp 
       lat={this.state.map.latitude}
       lon={this.state.map.longitude}
       foundUserLocation={this.state.map.foundUserLocation}
       feedHidden={this.state.feed.hidden}
       />
    ) : (
      <ReactLoading 
      type={"bars"}
      color={"#c13584"}
      height={128}
      width={128}
      />
    );

    return (
      <div className="App">
       {map}
      </div>
    );
  }
}

export default App;
