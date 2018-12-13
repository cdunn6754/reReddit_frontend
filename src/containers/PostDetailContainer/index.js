import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makePostDetailRequest } from '../../actions/Posts';
import PostDetail from '../../components/PostDetail';


class PostDetailContainer extends Component {
  componentDidMount() {
    const postId = this.props.match.params.postId || null;
    
    this.props.fetchPostDetail(postId);
  }
  
  render() {
    return <PostDetail {...this.props} />;
  }
}

const mapStateToProps = (state) => (
  {
    postBody: state.post.body,
    postTitle: state.post.title,
    postPoster: state.post.poster,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchPostDetail: (postId) => dispatch(makePostDetailRequest(postId)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetailContainer);