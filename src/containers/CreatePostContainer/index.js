import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreatePost from '../../components/CreatePost';
import { makeCreatePostRequest } from '../../actions/Posts';
import {
  getCreatePostError,
  getCreatePostLoading,
} from '../../reducers/createPost';
import {
  getSubredditTitle,
} from '../../reducers/subreddit';

class CreatePostContainer extends Component {

  render() {
    return <CreatePost {...this.props} />
  }
}

const mapDispatchToProps = (dispatch) => ({
    handleCreatePost: (title, body, subredditTitle) =>
      dispatch(makeCreatePostRequest(title, body, subredditTitle)),
})

const mapStateToProps = (state) => ({
    errorMessage: getCreatePostError(state),
    loading: getCreatePostLoading(state),
    subredditTitle: getSubredditTitle(state),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostContainer);
