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
    const map = this.state.map.foundUserLocation ? (
      <MapComp 
       lat={this.state.map.latitude}
       lon={this.state.map.longitude}
       foundUserLocation={this.state.map.foundUserLocation}
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
