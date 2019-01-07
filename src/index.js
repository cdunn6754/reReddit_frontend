import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import { store, persistor } from './store'
import SubredditContainer from './containers/SubredditContainer';
import NavBarContainer from './containers/NavBarContainer';
import UserAuthModalContainer from './containers/UserAuthModalContainer';
import CreatePostContainer from './containers/CreatePostContainer';
import PostListContainer from './containers/PostListContainer';
import PostDetailContainer from './containers/PostDetailContainer';
import CreateSubredditContainer from './containers/CreateSubredditContainer';
import SearchResultsContainer from './containers/SearchResultsContainer';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div className="whole-page">
          <NavBarContainer />
          <UserAuthModalContainer />
          <div className='main-layout'>
              <Switch>
                <Route
                  exact
                  path="/r/:subredditTitle/:createPost"
                  render={ (props) =>
                    <SubredditContainer
                      {...props}
                      skinny
                      primaryComponent={(props) =>
                        <CreatePostContainer {...props} />}
                    />}
                />
                <Route
                  exact
                  path="/r/:subredditTitle/postDetail/:postId"
                  render={ (props) =>
                    <SubredditContainer
                      {...props}
                      primaryComponent={(props) =>
                        <PostDetailContainer {...props} />}
                    />}
                />
              // Go directly to comments but otherwise same as postDetail
                <Route
                  exact
                  path="/r/:subredditTitle/postDetail/:postId/comments"
                  render={ (props) =>
                    <SubredditContainer
                      {...props}
                      primaryComponent={(props) =>
                        <PostDetailContainer {...props} commentScroll />}
                    />}
                />
                <Route
                  exact
                  path="/r/:subredditTitle"
                  render={ (props) =>
                    <SubredditContainer
                      {...props}
                      primaryComponent={(props) =>
                        <PostListContainer {...props} />}
                    />}
                />
                <Route
                  exact
                  path="/createSubreddit/"
                  render={
                    (props) =>
                    <CreateSubredditContainer
                        match={props.match}
                        history={props.history}
                    />
                  }
                />
                <Route
                  exact
                  path="/search/"
                  render={
                    (props) =>
                    <SearchResultsContainer
                        match={props.match}
                        history={props.history}
                    />
                  }
                />
                <Route
                  exact
                  path="/"
                  render={ (props) =>
                    <SubredditContainer
                      {...props}
                      primaryComponent={(props) =>
                        <PostListContainer {...props} />}
                    />}
                />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
