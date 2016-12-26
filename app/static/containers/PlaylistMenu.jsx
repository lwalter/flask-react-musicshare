import { connect } from 'react-redux';
import PlaylistList from '../components/PlaylistList.jsx';
import { getData, fetchPlaylistsSuccessful, addError, playlistsLoading } from '../actions/ActionCreators.jsx';

function mapStateToProps(state) {
  return {
    playlists: state.playlists,
    playlistsLoading: state.playlistsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlaylists: () => {
      return dispatch(getData('/api/playlists', fetchPlaylistsSuccessful, addError, playlistsLoading));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
