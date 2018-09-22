import React from 'react';
import './CurrentLocation.scss';

const CurrentLocation = props => {
  return (
    <form className="CurrentLocation" onSubmit={props.handleCurrentLocation}>
      <input type="submit" value="Current Location" className="CurrentLocation__btn" />
    </form>
  )
}

export default CurrentLocation;