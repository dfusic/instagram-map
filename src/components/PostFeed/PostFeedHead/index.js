import React from 'react';
import './PostFeedHeadTitle.scss';
const PostFeedHead = props => {
  return (
    <header className="PostFeedHead">
    <div className="PostFeedHead-title">
      <h3>Instagram Map</h3>
    </div>
      <div className="PostFeedHead-info">
        <h3 className="PostFeedHead_location">{`Location: ${props.location}`}</h3>
        <h3 className="PostFeedHead_count">{`${props.postCount} active posts`}</h3>
      </div>
    </header>
  )
}

export default PostFeedHead;