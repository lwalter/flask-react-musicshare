import * as types from '../constants/ActionTypes.jsx';
import initialState from '../store/InitialState.jsx';

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PLAYLIST:
      return [{
        title: action.title
      },
        ...state
      ];
    
    default:
      return state;
  }
}