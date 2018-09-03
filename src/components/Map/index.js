import React, { createRef, Component } from 'react'
import './Map.scss';
import { Map, TileLayer, Marker } from 'react-leaflet'

export default class MapComp extends Component {

  mapRef = createRef()

  render() {
    // check if user location is found, if is then allocate the longitude and latitude to marker and place it on the map
    const marker = this.props.foundUserLocation ? (
      <Marker 
      draggable={true}
      position={[this.props.lat, this.props.lon]}
      />
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
        </div>
    );
  }
}