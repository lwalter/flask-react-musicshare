import * as types from '../constants/ActionTypes.jsx';

export function playlists(state = [], action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTS_SUCCESSFUL:
      return [...action.playlists];
    
    case types.ADD_PLAYLIST:
      return [...state, { title: action.title }];
    
    default:
      return state;
  }
}


export function playlistSongs(state = [], action) {
  switch (action.type) {
    case types.FETCH_PLAYLIST_SONGS_SUCCESSFUL:
      return [...action.playlistSongs];
    
    default:
      return state;
  }
}

export function playlistsLoading(state = false, action) {
  switch (action.type) {
    case types.PLAYLISTS_LOADING:
      return action.isLoading;
    
    default:
      return state;
  }
}

export function playlistSongsLoading(state = false, action) {
  switch (action.type) {
    case types.PLAYLIST_SONGS_LOADING:
      return action.isLoading;
    
    default:
      return state;
  }
}