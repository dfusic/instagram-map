import React, { createRef, Component } from 'react'
import './Map.scss';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet'

import PostFeed from '../PostFeed';

export default class MapComp extends Component {

  state = {
    posts: [],
    location: '',
    loaded: false,
    marker: {
      lat: this.props.lat,
      lon: this.props.lon
    }
  }

  mapRef = createRef();

  refmarker = React.createRef()
  
  getPosts = (locationID) => {
    axios.get(`https://api.instagram.com/v1/locations/${locationID}/media/recent?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=10`)
      .then(response=>{
        this.setState({
          posts: [...response.data.data]
        })
      })
      .catch(error=>{
        console.log(error);
      })

  }

  getLocation = (lat, lng) => {
    axios.get(`https://api.instagram.com/v1/locations/search?lat=${lat}&lng=${lng}&access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c`)
      .then(response=>{
        this.getPosts(response.data.data[0].id);
      })
      .catch(error=>{
        console.log(error);
      })
  }
  updatePosition = () => {
    // get lat and lng from ref marker
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng()
    this.setState({
      marker: {
        lat: lat,
        lon: lng
      }
    });
    this.getLocation(this.state.marker.lat, this.state.marker.lon);
  }
  componentDidMount(){
   this.getLocation(this.state.marker.lat, this.state.marker.lon);
  }

  render() {
    // check if user location is found, if is then allocate the longitude and latitude to marker and place it on the map
    const marker = this.props.foundUserLocation ? (
      <Marker 
      draggable={true}
      onDragend={this.updatePosition}
      position={[this.state.marker.lat, this.state.marker.lon]}
      ref={this.refmarker}>
      </Marker>
    ) : null;

    let mapRender = null;

    if(this.props.foundUserLocation){
      mapRender = (
        <Map
        center={[this.state.marker.lat, this.state.marker.lon]}
        zoom={15}
        >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}

        </Map>
      );
    }
    
    return ( 
        <div className="Map">
        {mapRender}
        <PostFeed 
        posts={this.state.posts}
        />
        </div>
    );
  }
}