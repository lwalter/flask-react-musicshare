import * as types from '../constants/ActionTypes.jsx';

export function addPlaylist(title) {
  return {
    type: types.ADD_PLAYLIST,
    title: title
  }
}