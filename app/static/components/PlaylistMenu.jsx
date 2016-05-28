import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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

    var createPlaylistKey = (!!playlists && Array.isArray(playlists) && playlists.length) 
      ? playlists.length + 1 : 0;
    
    return (
      <div>
        <Navbar.Header>
          <Navbar.Brand>Playlists</Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="pills" pullLeft stacked activeKey={1}>
          {playlists}
          <LinkContainer to="/create-playlist">
            <NavItem eventKey={createPlaylistKey}>Create a new playlist</NavItem>
          </LinkContainer>
        </Nav>
      </div>
    )
  }
}

export default PlaylistMenu;