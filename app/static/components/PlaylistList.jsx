import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import { Nav, NavItem, Navbar, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { LinkContainer } from 'react-router-bootstrap'; // eslint-disable-line no-unused-vars
import PlaylistListItem from './PlaylistListItem.jsx'; // eslint-disable-line no-unused-vars

class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPlaylists();
  }
  
  render() {
    var playlists = this.props.playlists.map((playlist) => {
      return (
        <PlaylistListItem playlist={playlist.id} key={playlist.id}>{playlist.title}</PlaylistListItem>
      )
    });
    
    if (this.props.playlistsLoading) {
      playlists = (<div>Loading...</div>);
    } else if (!!playlists && Array.isArray(playlists) && !playlists.length) {
      playlists = (<div>No playlists found.</div>);
    }
    
    var createPlaylistKey = 0;
    
    if (!!playlists && Array.isArray(playlists) && playlists.length) {
      createPlaylistKey = playlists.length + 1;
    }
    
    return (
      <div>
        <Row>
          <Col md={12}>
            <h3>Playlists</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Nav bsStyle="pills" pullLeft stacked activeKey={0}>
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

PlaylistList.propTypes = {
  fetchPlaylists: React.PropTypes.func.isRequired,
  playlists: React.PropTypes.array
};

export default PlaylistList;
