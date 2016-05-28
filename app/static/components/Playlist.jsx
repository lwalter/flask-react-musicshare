import React from 'react';
import $ from 'jquery';
import SongListItem from './SongListItem.jsx';
import SongForm from './SongForm.jsx';
import { ListGroup } from 'react-bootstrap';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      songs: []
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
  
  render() {
    var songs = this.state.songs.map((song) => {
      return (
        <SongListItem song={song} deleteSong={this.deleteSongListItem.bind(this, song.id)} key={song.id}/>
      );
    });

    return (
      <div>
        <h3>Songs</h3>
        <ListGroup>
          {songs}
        </ListGroup>
        <SongForm playlist={this.props.params.playlistId}/>
      </div>
    )
  }
}

export default Playlist;