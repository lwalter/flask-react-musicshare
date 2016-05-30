import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import { Nav, NavItem, Navbar, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { LinkContainer } from 'react-router-bootstrap'; // eslint-disable-line no-unused-vars
import PlaylistMenuItem from './PlaylistMenuItem.jsx'; // eslint-disable-line no-unused-vars

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
        <Row>
          <Col md={12}>
            <h3>Playlists</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Nav bsStyle="pills" pullLeft stacked activeKey={1}>
              {playlists}
              <LinkContainer to="/create-playlist">
                <NavItem eventKey={createPlaylistKey}>Create a new playlist</NavItem>
              </LinkContainer>
            </Nav>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PlaylistMenu;