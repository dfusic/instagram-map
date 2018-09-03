import React, { Component } from 'react';
import MapComp from './Map';
import './App.css';

class App extends Component {
  state = {
    map: {
      longitude: '',
      latitude: '',
      foundUserLocation: false
    }
  }
  componentWillMount(){
    // get user location from geolocation API
    // if browser supports geolocation
    if(navigator.geolocation){
      // get current user position
      navigator.geolocation.getCurrentPosition((position)=>{

        //get user latitude and longitude
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        this.setState({
          map: {
            longitude: longitude,
            latitude: latitude,
            foundUserLocation: true,
          }
        });
      })
    }else{
      // give map longitude and latitude of Londom 
      this.setState({
        map: {
          longitude: 51,
          latitude: 0.12,
          foundUserLocation: true,
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
       <MapComp 
       lat={this.state.map.latitude}
       lon={this.state.map.longitude}
       foundUserLocation={this.state.map.foundUserLocation}
       />
      </div>
    );
  }
}

export default App;
