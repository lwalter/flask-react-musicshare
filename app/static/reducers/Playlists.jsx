import * as types from '../constants/ActionTypes.jsx';
import initialState from '../store/InitialState.jsx';

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PLAYLIST:
      return Object.assign({}, state, {
        playlists: [
          ...state.playlists,
          {
            title: action.title
          }]
      });
      
    default:
      return state;
  }
}