import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { MdMenu } from "react-icons/md";
import { MenuItem, Dropdown } from "react-bootstrap";

import "./styles.css";

const MobileUserAuthNav = props => {
  const {
    authUsername,
    handleLogout,
    showModal,
    redirectToCreatePost,
    redirectToCreateSubreddit
  } = props;

  const authenticatedMenu = (
    <Fragment>
      <MenuItem eventKey="1" onClick={redirectToCreatePost}>
        Create post
      </MenuItem>
      <MenuItem eventKey="2" onClick={redirectToCreateSubreddit}>
        Create subreddit
      </MenuItem>
      <MenuItem eventKey="3" onClick={handleLogout}>
        Logout
      </MenuItem>
      <MenuItem
        eventKey="4"
        href="https://github.com/cdunn6754/reReddit_frontend"
      >
        reReddit Github
      </MenuItem>
    </Fragment>
  );

  const unAuthenticatedMenu = (
    <Fragment>
      <MenuItem eventKey="1" onClick={() => showModal("login")}>
        Sign in
      </MenuItem>
      <MenuItem
        eventKey="2"
        href="https://github.com/cdunn6754/reReddit_frontend"
      >
        reReddit Github
      </MenuItem>
    </Fragment>
  );

  return (
    <div id="mobile-user-auth-dropdown-container">
      <Dropdown pullRight id="authenticated-user-dropdown">
        <Dropdown.Toggle>
          <MdMenu />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {authUsername ? authenticatedMenu : unAuthenticatedMenu}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default withRouter(MobileUserAuthNav);