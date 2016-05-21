import React from 'react';
import { Link } from 'react-router';

class PlaylistMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playlistUrl = "/playlist/" + this.props.playlist;
    return (
      <li>
        <Link to={playlistUrl}>{this.props.children}</Link>
      </li>
    )
  }
}

export default PlaylistMenuItem;