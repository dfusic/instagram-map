import React, {Component} from 'react';
import './PostFeed.scss';
import SinglePost from '../SinglePost';
import PostFeedHead from './PostFeedHead';
import PostFeedToggle from './PostFeedToggle';

class PostFeed extends Component{
  state = {
    feed: {
      hidden: this.props.feedHidden
    },
    buttonStyle : {
      width: '25px',
      height: 'auto',
      cursor: 'pointer'
    },
    hiddenClass: " "
  };
  // when the component recieves props, 
  // pass those props to the state so they can be dynamically changed
  componentWillReceiveProps(){
    this.setState({
      feed: {
        hidden: this.props.feedHidden
      }
    })
  }

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
         // if there are posts, pass every post to its own component
          return <SinglePost 
          post={post}
          key={post.id}
          />     
      })
    ) : null;
    // check if the feed should hide
    const style = this.state.feed.hidden ? "hidden" : "";
    // toggle icon
    return(
      <aside className={`PostFeed ${style}`}>
        <PostFeedHead 
        location={this.props.location}
        postCount={this.props.posts.length}
        />
        <PostFeedToggle 
        hidden={this.state.feed.hidden}
        handleClick={this.toggleFeed}
        />
        <div className="PostFeed__feed">
        {posts}
        
        </div>
      </aside>
    )
  }
}

export default PostFeed;