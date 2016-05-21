import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

import PlaylistMenuItem from './PlaylistMenuItem.jsx';

class PlaylistMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: []
    };
  }

  loadPlaylists() {
    var request = $.ajax({
      url: '/api/playlists',
      dataType: 'json',
      method: 'GET',
      success: (data) => {
        this.setState({ playlists: data.playlists });
      },
      error: (xhr, status, err) => {
        console.log('Error');
      }
    });
    
    return request;
  }
  componentDidMount() {
    this.serverRequest = this.loadPlaylists();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }
  
  render() {
    var playlists = this.state.playlists.map((playlist) => {
      return (
        <PlaylistMenuItem playlist={playlist.id} key={playlist.id}>{playlist.title}</PlaylistMenuItem>
      )
    });
    return (
      <ul>
        {playlists}
        <li><Link to="/create-playlist">Create a new playlist</Link></li>
      </ul>
    )
  }
}

export default PlaylistMenu;