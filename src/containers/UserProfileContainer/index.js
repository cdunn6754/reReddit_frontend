import React, { Component } from "react";
import { connect } from "react-redux";

import UserProfile from "../../components/UserProfile";
import {
  makeUserProfileRequest,
  setUserProfileView
} from "../../actions/UserProfile";
import {
  getUserProfileCommentIdsByPostId,
  getUserProfileLoading,
  getUserProfileError,
  getUserProfileView,
  getUserProfileData
} from "../../reducers/userProfile";
import { getAllPosts } from "../../reducers/postList";

class UserProfileContainer extends Component {
  componentDidMount() {
    this.props.fetchUserProfile(this.props.match.params.username);
  }

  componentDidUpdate(prevProps) {
    // if only the username prop changes this component won't
    // be remounted so update it
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.props.fetchUserProfile(this.props.match.params.username);
    }
  }

  render() {
    const {
      commentIdsByPostId,
      allPosts,
      error,
      loading,
      profileView,
      changeProfileView,
      match: {
        params: { username }
      },
      userData: { cakeDay, karma }
    } = this.props;

    return (
      <UserProfile
        {...{
          commentIdsByPostId,
          allPosts,
          username,
          error,
          loading,
          profileView,
          changeProfileView,
          cakeDay,
          karma
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  commentIdsByPostId: getUserProfileCommentIdsByPostId(state),
  allPosts: getAllPosts(state),
  userData: getUserProfileData(state),
  profileView: getUserProfileView(state),
  loading: getUserProfileLoading(state),
  error: getUserProfileError(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: username => dispatch(makeUserProfileRequest(username)),
  changeProfileView: view => dispatch(setUserProfileView(view))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
