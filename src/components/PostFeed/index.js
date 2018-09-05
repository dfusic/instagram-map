import React, {Component} from 'react';
import './PostFeed.scss';

import SinglePost from '../SinglePost';

class PostFeed extends Component{
  componentDidMount(){
    console.log(this.props.posts);
  }
  render(){
    const posts = this.props.posts ? (
      this.props.posts.map(post=>{
        return <SinglePost 
        img={post.images.standard_resolution.url}
        author={post.user.username}
        link={post.link}
        key={post.id}
        
        />
      })
    ) : null;

    return(
      <aside className="PostFeed">
        <h1>PostFeed</h1>
        {posts}
      </aside>
    )
  }
}

export default PostFeed;