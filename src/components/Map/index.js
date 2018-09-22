import React, { createRef, Component } from 'react'
import './Map.scss';
import axios from 'axios';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet'
import marker from '../../assets/marker.svg';
import PostFeed from '../PostFeed';
import MapSearch from './MapSearch';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default class MapComp extends Component {

  state = {
    posts: [],
    location: '',
    loaded: false,
    marker: {
      lat: this.props.lat,
      lon: this.props.lon,
      icon: L.icon({
        iconUrl: marker
      })
    },
    feed: {
      hidden: this.props.feedHidden
    },
    search: {
      didSearch: false,
      searchValue: ""
    }
  }

  mapRef = createRef();

  refmarker = React.createRef()

  getPosts = (locationID) => {
    axios.get(`https://api.instagram.com/v1/locations/${locationID}/media/recent?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=10`)
      .then(response => {
        this.setState({
          posts: [...response.data.data]
        })
      })
      .catch(error => {
        console.log(error);
      })

  }

  getLocation = (lat, lng) => {
    axios.get(`https://api.instagram.com/v1/locations/search?lat=${lat}&lng=${lng}&access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c`)
      .then(response => {
        this.getPosts(response.data.data[0].id);
        this.setState({
          location: response.data.data[0].name
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  updatePosition = () => {
    // get lat and lng from ref marker
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng()
    this.setState({
      marker: {
        lat: lat,
        lon: lng,
        icon: this.state.marker.icon
      }
    });
    this.getLocation(this.state.marker.lat, this.state.marker.lon);
  }
  componentDidMount() {
    this.getLocation(this.state.marker.lat, this.state.marker.lon);
  }
  // handle search of location the MapSearch component

  getSubmitData = e => {
    // duplicate prev state
    let lastSearchState = this.state.search;
    lastSearchState.searchValue = e.target.value;
    this.setState({
      search: lastSearchState
    })
  }

  handleSearch = e => {
    e.preventDefault();
    let lastSearchState = this.state.search;
    lastSearchState.didSearch = true;
    this.setState({
      search: lastSearchState
    });
    // initialize a provider throgh OSMP
    let provider = new OpenStreetMapProvider();
    // use promises to search for geolocation from the state
    provider.search({ query: this.state.search.searchValue })
      .then(result => {
        // set the marker location to the search location
        this.setState({
          marker: {
            lat: result[0].y,
            lon: result[0].x,
            icon: this.state.marker.icon
          }
        });
        // fetch the data from instagram api from the location the user searched for
        this.getLocation(this.state.marker.lat, this.state.marker.lon);
      })
      .catch(error => {
        alert("There was an error. Check the console.");
        console.error(error);
      })
  }


  render() {
    // check if user location is found, if is then allocate the longitude and latitude to marker and place it on the map
    const marker = this.props.foundUserLocation ? (
      <Marker
        draggable={true}
        onDragend={this.updatePosition}
        position={[this.state.marker.lat, this.state.marker.lon]}
        ref={this.refmarker}
        icon={this.state.marker.icon}
      >
      </Marker>
    ) : null;

    let mapRender = null;

    if (this.props.foundUserLocation) {
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
        <MapSearch
          handleSearch={e => this.handleSearch(e)}
          getSubmitData={this.getSubmitData}
        />
        {mapRender}
        <PostFeed
          location={this.state.location}
          posts={this.state.posts}
          feedHidden={this.state.feed.hidden}
        />
      </div>
    );
  }
}