import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import { NavItem } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { LinkContainer } from 'react-router-bootstrap'; // eslint-disable-line no-unused-vars

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

PlaylistMenuItem.propTypes = {
  playlist: React.PropTypes.number.isRequired
};

export default PlaylistMenuItem;