import React from 'react';
import './SinglePost.scss';
const SinglePost = props => {
  //"https://api.instagram.com/v1/users/self/media/recent/?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=3"
  return(
    <article className="SinglePost">
      <img src={props.img} alt="test" className="SinglePost__img"/>
      <h2 className="SinglePost__author">{props.author}</h2>
      <a href={props.link} className="SinglePost__link">See post</a>
      {
        props.caption ? (
          <p className="SinglePost__caption">{props.caption}</p>
        ) : null
      }
    </article>
  )
}

export default SinglePost;