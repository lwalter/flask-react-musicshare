import { connect } from 'react-redux';
import PlaylistList from '../components/PlaylistList.jsx';
import { getData, fetchPlaylistsSuccessful, addError } from '../actions/ActionCreators.jsx';

function mapStateToProps(state) {
  return {
    playlists: state.playlists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlaylists: () => {
      return dispatch(getData('/api/playlists', fetchPlaylistsSuccessful, addError));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
