import React, {Component} from 'react';
import './PostFeed.scss';
import ReactLoading from 'react-loading';
import SinglePost from '../SinglePost';

class PostFeed extends Component{

  render(){
    const posts = this.props.posts ? (
      this.props.posts.map(post=>{
        // check if post has caption, if it has then pass it to the component
        // else render the component without caption
        return <SinglePost 
        img={post.images.standard_resolution.url}
        author={post.user.username}
        link={post.link}
        key={post.id}
        />
      })
    ) : (
      <ReactLoading 
      type={"bars"}
      color={"#c13584"}
      height={128}
      width={128}
      />
    );

    return(
      <aside className="PostFeed">
        <h1 className="PostFeed__title">Instagram Map</h1>
        {posts}
      </aside>
    )
  }
}

export default PostFeed;