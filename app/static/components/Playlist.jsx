import React from 'react';
import $ from 'jquery';
import SongListItem from './SongListItem.jsx'; // eslint-disable-line no-unused-vars
import { ListGroup, Button, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import SongForm from './SongForm.jsx'; // eslint-disable-line no-unused-vars

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
    
    var songElement = (!!songs && Array.isArray(songs) && songs.length > 0)
      ? (<ListGroup>{songs}</ListGroup>) : (<h2>You don't have any songs in this playlist</h2>);

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
            {songElement}
          </Col>
        </Row>
        <SongForm playlist={this.props.params.playlistId} show={this.state.openSongSearch} hide={this.closeSongSearch.bind(this)} />
      </div>
    )
  }
}

export default Playlist;