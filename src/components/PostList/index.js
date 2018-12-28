import React from 'react';

import PostPanelContainer from '../../containers/PostPanelContainer';
import { ErrorAlert } from '../AlertMessage';
import { PanelListLoader } from '../Loaders';
import './styles.css';

const PostList = (props) => {
  const {posts, loading, error, allPosts} = props;

  
  if (error) {
    return(
      <ErrorAlert>
        {error}
      </ErrorAlert>
    )
  }
  
  let postList;
  if (loading) {
    postList =  <PanelListLoader panelNumber={15}/>;
  } else {
      postList = allPosts.map((postPk) => {
        return <PostPanelContainer postPk={postPk} key={postPk}/>
    });
  }
  
  return (
    <div className='postlist-content'>
      <ul>
        {postList}
      </ul>
    </div>
  );
}

export default PostList;
