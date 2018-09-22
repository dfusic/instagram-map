import React, { Component } from 'react';
import './MapSearch.scss';

export default class MapSearch extends Component {
  render() {
    return (
      <form className="MapSearch" onSubmit={this.props.handleSearch}>
        <input type="text" className="MapSearch__input" onChange={this.props.getSubmitData} />
        <input type="submit" value="Search" className="MapSearch__submit" />
      </form>
    )
  }
}