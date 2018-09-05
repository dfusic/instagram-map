import React, { createRef, Component } from 'react'
import './Map.scss';
import { Map, TileLayer, Marker } from 'react-leaflet'
import PostFeed from '../PostFeed';

export default class MapComp extends Component {

  state = {
    posts: [],
    location: ''
  }

  mapRef = createRef();

  refmarker = React.createRef()
  
  updatePosition = () => {
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng()
    // https://api.instagram.com/v1/users/self/media/recent/?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=3
    // get location id from latitude and longitude
    console.log(lat, lng);
    fetch(`https://api.instagram.com/v1/locations/search?lat=${lat}&lng=${lng}&access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c`)
      .then(response=>{
        return response.json();
      })
      .then(json=>{
        console.log(json);
        // push location id to the state
        this.setState({
          location: json.data[0].id 
        });
        // get recent posts from instagram api from the same location id
        fetch(`https://api.instagram.com/v1/locations/${this.state.location}/media/recent?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=10`)
          .then(response=>{
            return response.json();
          })
          .then(json=>{
            // push posts to posts state
            this.setState({
              posts: [...json.data]
            });
            console.log(this.state.posts);
          })
      })
  }

  

  render() {
    // check if user location is found, if is then allocate the longitude and latitude to marker and place it on the map
    const marker = this.props.foundUserLocation ? (
      <Marker 
      draggable={true}
      onDragend={this.updatePosition}
      position={[this.props.lat, this.props.lon]}
      ref={this.refmarker}
      >
      </Marker>
    ) : null;

    let mapRender = null;

    if(this.props.foundUserLocation){
      mapRender = (

        <Map
        center={[this.props.lat, this.props.lon]}
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