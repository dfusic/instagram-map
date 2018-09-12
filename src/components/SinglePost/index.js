import React, { Component } from 'react';
import Slider from 'react-slick';
import './SinglePost.scss';

class SinglePost extends Component {
  //"https://api.instagram.com/v1/users/self/media/recent/?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=3"
  state = {
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    },
    post: this.props.post
  }
  componentDidMount(){
    console.log(this.state.post);
  }
  render(){
    let caption = null;
    if(this.state.post.caption !== null){
      caption = (
        <p className="SinglePost__caption">{this.state.post.caption.text}</p>
      )
    }

    return(
      <article className="SinglePost">
      {/* check if there is a caroursel then render it, otherwise render only one image*/}
        
        <div className="SinglePost__head">
          <h2 className="SinglePost__author">{this.state.post.user.username}</h2>
          <a href={this.state.post.link} className="SinglePost__link">See post</a>
        </div>
        {caption}
       }
      </article>
    )
  }
}

export default SinglePost;