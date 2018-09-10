import React, {Component} from 'react';
import './PostFeed.scss';
import ReactLoading from 'react-loading';
import ShowFeed from './ShowFeed';
import CloseFeed from './CloseFeed';
import SinglePost from '../SinglePost';

class PostFeed extends Component{
  state = {
    feed: {
      hidden: false
    }
  };

  toggleFeed = () => {
    this.setState({
      feed: {
        hidden: !this.state.feed.hidden
      }
    })
    console.log(this.state.feed);
  }

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
    // check if the feed should hide
    const feed = this.state.feed.hidden ? (
      <h1>test</h1>
    ) : (
     <h1>false</h1>
    );
    const icon = this.state.feed.hidden ? (
      <CloseFeed 
      handleClick={this.toggleFeed}
      />
    ) : (
      <ShowFeed 
      handleClick={this.toggleFeed}
      />
    )
    return(
      <aside className="PostFeed">
      <div className="PostFeed__header">
        <h1 className="PostFeed__title">Instagram Map</h1>
        {feed}
        {icon}
        </div>
        {posts}
      </aside>
    )
  }
}

export default PostFeed;