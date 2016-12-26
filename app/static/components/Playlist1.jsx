import React from 'react';
import { ListGroup } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import SongListItem from './SongListItem.jsx'; // eslint-disable-line no-unused-vars

class Playlist1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const prevPlaylistId = prevProps.params.playlistId;
    const currPlaylistId = this.props.params.playlistId;
    
    if (prevPlaylistId !== currPlaylistId) {
      this.props.fetchPlaylistSongs();
    }
  }

  render() {
    var songs = this.props.playlistSongs.map((song) => {
      return (<div key={song.id}>A song goes here.</div>);
      /*
      return (
        <SongListItem song={song} deleteSong={this.props.deleteSongListItem.bind(this, song.id)} key={song.id} />
      );
      */
    });
    
    // TODO(lnw) this might change in the future, refactor when needed.
    var songElement;
    
    if (this.props.playlistSongsLoading) {
      songElement = (<div>Loading...</div>);
    } else if (!!songs && Array.isArray(songs) && songs.length > 0) {
      songElement = (<ListGroup>{songs}</ListGroup>);
    } else {
      songElement = (<h2>You don't have any songs in this playlist</h2>);
    }
    
    // TODO(lnw) the above should definitely change, need to utilize async fetch and only display the empty message
    // if the webservice has returned and no songs exist for the given playlist
    
    return (
      <div>
        {songElement}
      </div>
    )
  }
}

export default Playlist1;