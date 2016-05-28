import React from 'react';
import { Link } from 'react-router';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class PlaylistMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playlistUrl = "/playlist/" + this.props.playlist;
    return (
      <LinkContainer to={playlistUrl}>
        <NavItem eventKey={this.props.playlist}>{this.props.children}</NavItem>
      </LinkContainer> 
    )
  }
}

export default PlaylistMenuItem;