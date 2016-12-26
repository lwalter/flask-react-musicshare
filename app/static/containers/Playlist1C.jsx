import { connect } from 'react-redux';
import Playlist1 from '../components/Playlist1.jsx';
import { getData, fetchPlaylistSongsSuccessful, addError, playlistSongsLoading } from '../actions/ActionCreators.jsx';

function mapStateToProps(state) {
  return {
    playlistSongs: state.playlistSongs,
    playlistSongsLoading: state.playlistSongsLoading
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPlaylistSongs: () => {
      return dispatch(
        getData(
          '/api/playlist/' + ownProps.params.playlistId + '/songs', 
          fetchPlaylistSongsSuccessful, 
          addError, 
          playlistSongsLoading
        )
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist1);