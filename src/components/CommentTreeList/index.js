import React from 'react';

import Loader from '../ListLoader';
import { ErrorAlert } from '../AlertMessage';
import CommentContainer from '../../containers/CommentContainer';
import CommentEditorContainer from '../../containers/CommentEditorContainer';
import { withMaybe } from '../../utilities/HOC';

const CommentTreeList = (props) => {
  const {
    rootComments,
    error,
    loading,
    createCommentError,
    createCommentLoading,
  } = props;
  
  if (error) {
    return (
      <ErrorAlert>
        {error}
      </ErrorAlert>
    )
  }
  
  let commentTreeRootList = [];
  if (loading)  {
    commentTreeRootList = <Loader />;
  } else {
    commentTreeRootList = (!Array.isArray(rootComments) || !rootComments.length)
      ? []
      : rootComments.map(root => (
        <CommentContainer
          pk={root.pk}
          key={root.pk}
        />
      ))
  }

  // Error with root comment creation
  const AlertOnError = withMaybe((props) =>
    props.children)(ErrorAlert)
  
  return (
    <div className='comment-tree-list-container'>
      <AlertOnError children={createCommentError} />
      <div className='top-comment-editor'>
        <CommentEditorContainer rootComment={true}/>
      </div>

      <ul>
        {commentTreeRootList}
      </ul>
    </div>
  )
}

export default CommentTreeList;
