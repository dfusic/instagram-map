import React, { Component } from 'react';
import Slider from 'react-slick';
import "video-react/dist/video-react.css"; // import css/ or import scss 
import {Player} from 'video-react';
import SocialInfo from './SocialInfo';
import './SinglePost.scss';

class SinglePost extends Component {
  //"https://api.instagram.com/v1/users/self/media/recent/?access_token=6899647538.0912694.f76d2fb4ade2471f98d0e1c89053141c&count=3"
  state = {
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false
          }
        }
      ]
    },
    post: this.props.post,
  }
  componentDidMount(){
    console.log(this.state.post);  
  }
  render(){
    // if there's post captio then display it
    const caption = this.state.post.caption !== null ? (
      <p className="SinglePost__caption">{this.state.post.caption.text}</p>
    ) : null;
    // check if theres multiple images

    let image = null;
    if(this.state.post.type === "carousel"){
      image = (
        <Slider {...this.state.settings}>
        {
          this.state.post.carousel_media.map(img=>{
            console.log(img);
            return (
              <div key={this.state.post.id}>
                <img src={img.images.standard_resolution.url} alt={this.state.post.user.username} className="SinglePost__img"/>
              </div>
            )
          })
        }
      </Slider>
      );
    }else if(this.state.post.type === "image"){
      image = (
        <img src={this.state.post.images.standard_resolution.url} alt={this.state.post.user.username} className="SinglePost__img"/>
      );
    }else if(this.state.post.type === "video"){
      image = (
        <Player>
          <source src={this.state.post.videos.standard_resolution.url}/>
        </Player>
      );
    }else{
      console.error("Error happended.");
    }

    return(
      <article className="SinglePost">
      {/* check if there is a caroursel then render it, otherwise render only one image*/}
        {image}
        <div className="SinglePost__head">
          <a href={this.state.post.link} className="SinglePost__link">
            <h2 className="SinglePost__author">{this.state.post.user.username}</h2>
          </a>
          <SocialInfo 
          likes={this.state.post.likes.count}
          comments={this.state.post.comments.count}
          />
        </div>
        {caption}
      </article>
    )
  }
}

export default SinglePost;