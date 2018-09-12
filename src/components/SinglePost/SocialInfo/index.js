import React from 'react';
import './SocialInfo.scss';
import likes from '../../../assets/like.svg';
import comments from '../../../assets/comments.svg';

const SocialInfo = props => {
  return (
    <div className="SocialInfo">
      <div className="SocialInfo__likes">
        <img src={likes} alt={`${props.likes} likes`} className="SocialInfo__icon"/>
        <p className="SocialInfo__desc">{
          props.likes === 1 ? (
            `${props.likes} like`
          ) : (
            `${props.likes} likes`
          )
        }</p>
      </div>
      <div className="SocialInfo__comments">
      <img src={comments} alt={`${props.comments} comments`} className="SocialInfo__icon"/>
      <p className="SocialInfo__desc">{
        props.comments === 1 ? (
          `${props.comments} comments`
        ) : (
          `${props.comments} comments`
        )
      }</p>
      </div>
    </div>
  )
}

export default SocialInfo;