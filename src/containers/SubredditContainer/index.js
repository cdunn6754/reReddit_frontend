import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeSubDetailRequest } from '../../actions/Subreddit';
import Subreddit from '../../components/Subreddit';


class SubredditContainer extends Component {
  componentDidMount() {
    // a null subredditTitle implies we are at the home url
    const subredditTitle = this.props.match.params.subredditTitle || null;
    
    this.props.fetchSubDetail(subredditTitle);
  }
  
  componentDidUpdate(prevProps) {
    // a null subredditTitle implies we are at the home url
    const subredditTitle = this.props.match.params.subredditTitle || null;
    
    if (
      this.props.match.params.subredditTitle !==
      prevProps.match.params.subredditTitle
    ) {
      this.props.fetchSubDetail(subredditTitle);
    }
    
    this.props.fetchSubDetail(subredditTitle);
  }
  
  render() {
    return <Subreddit {...this.props} />
  }
  
}

const mapStateToProps = state => (
  {
    title: state.subreddit.title,
    description: state.subreddit.description,
  }
)

const mapDispatchToProps = dispatch => (
  {
    fetchSubDetail: (subredditTitle) =>
      dispatch(makeSubDetailRequest(subredditTitle)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubredditContainer);
