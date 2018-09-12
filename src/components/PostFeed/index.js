import React, {Component} from 'react';
import './PostFeed.scss';
import ReactLoading from 'react-loading';
import ShowFeed from './ShowFeed';
import CloseFeed from './CloseFeed';
import SinglePost from '../SinglePost';

class PostFeed extends Component{
  state = {
    feed: {
      hidden: this.props.feedHidden
    },
    buttonStyle : {
      width: '25px',
      height: 'auto',
      cursor: 'pointer'
    }
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
    ) : (
      <ReactLoading 
      type={"bars"}
      color={"#c13584"}
      height={128}
      width={128}
      />
    );
    // check if the feed should hide
    const style = this.state.feed.hidden ? {
      top: 0,
      right: '-400px'
    } : {
      top: 0,
      right: 0
    }
    // toggle icon
    const icon = this.state.feed.hidden ? (
      <ShowFeed 
      handleClick={this.toggleFeed}
      style={this.state.buttonStyle}
      color={"#fff"}
      />
    ) : (
      <CloseFeed 
      handleClick={this.toggleFeed}
      style={this.state.buttonStyle}
      color={"#fff"}
      />
    )
    return(
      <aside className="PostFeed" style={style}>
      <div className="PostFeed__header">
        {icon}
        <h1 className="PostFeed__title">Instagram Map</h1>
      </div>
        <div className="PostFeed__feed">
        {posts}
        </div>
      </aside>
    )
  }
}

export default PostFeed;