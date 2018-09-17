import React, { Component } from 'react';
import Icon from './Icon';
import './PostFeedToggle.scss';

class PostFeedToggle extends Component {

  render(){
    return (
      <div className={
        `PostFeedToggle ${
          this.props.hidden ? " hidden" : " "
        }`
      } onClick={this.props.handleClick}>
        <Icon 
        hidden={this.props.hidden}
        />
      </div>
    )

  }

}
export default PostFeedToggle;