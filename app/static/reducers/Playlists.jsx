import * as types from '../constants/ActionTypes.jsx';

export function playlists(state = [], action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTS:
      return [...action.playlists];
    
    case types.ADD_PLAYLIST:
      return [...state, { title: action.title }];
    
    default:
      return state;
  }
}
