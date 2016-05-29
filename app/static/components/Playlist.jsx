import React from 'react';
import $ from 'jquery';
import SongListItem from './SongListItem.jsx';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import SongForm from './SongForm.jsx';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      songs: [],
      openSongSearch: false
    });
  }
  
  loadSongs() {
    var request = $.ajax({
      url: '/api/playlist/' + this.props.params.playlistId + '/songs',
      dataType: 'json',
      method: 'GET',
      success: (data) => {
        console.log(data);
        this.setState({ songs: data.songs });
      },
      error: (xhr, status, err) => {
        console.log('Error');
      }
    });

    return request;
  }

  componentDidUpdate(prevProps) {
    var prevPlaylistId = prevProps.params.playlistId;
    var currPlaylistId = this.props.params.playlistId;

    if (prevPlaylistId !== currPlaylistId) {
      this.serverRequest = this.loadSongs();
    }
  }

  componentDidMount() {
    this.serverRequest = this.loadSongs();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }
  
  deleteSongListItem(songId, e) {
    e.preventDefault();

    $.ajax({
      url: '/api',
      success: (data) => {
        var songs = this.state.songs.filter((song) => {
          return songId !== song.id;
        });

        this.setState({songs: songs});
      }
    });
  }

  openSongSearch() {
    this.setState({ openSongSearch: true });
  }
  
  closeSongSearch() {
    this.setState({ openSongSearch: false });
  }
  
  render() {
    var songs = this.state.songs.map((song) => {
      return (
        <SongListItem song={song} deleteSong={this.deleteSongListItem.bind(this, song.id)} key={song.id}/>
      );
    });

    return (
      <div>
        <Row>
          <Col md={8}>
            <h3>Songs</h3>
          </Col>
          <Col md={4}>
            <Button onClick={this.openSongSearch.bind(this)} bsStyle="primary">Add a song</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ListGroup>
              {songs}
            </ListGroup>
          </Col>
        </Row>
        <SongForm playlist={this.props.params.playlistId} show={this.state.openSongSearch} hide={this.closeSongSearch.bind(this)} />
      </div>
    )
  }
}

export default Playlist;