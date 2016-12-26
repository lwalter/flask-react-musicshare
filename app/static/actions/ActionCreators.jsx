import * as types from '../constants/ActionTypes.jsx';
import $ from 'jquery';

export function addPlaylist(title) {
  return {
    type: types.ADD_PLAYLIST,
    title: title
  };
}
export function fetchPlaylistsSuccessful(data) {
  return {
    type: types.FETCH_PLAYLISTS_SUCCESSFUL,
    playlists: data.playlists
  };
}

export function playlistsLoading(isLoading) {
  return {
    type: types.PLAYLISTS_LOADING,
    isLoading: isLoading
  };
}

export function fetchPlaylistSongsSuccessful(data) {
  console.log(data.songs);
  return {
    type: types.FETCH_PLAYLIST_SONGS_SUCCESSFUL,
    playlistSongs: data.songs
  }
}
export function playlistSongsLoading(isLoading) {
  return {
    type: types.PLAYLIST_SONGS_LOADING,
    isLoading: isLoading
  };
}

export function getData(url, successAction, errorAction, loadingAction) {
  return function (dispatch) {
    // TODO(lnw) should I really be dispatching here like this?
    if (!!loadingAction) {
      dispatch(loadingAction(true));
    }
    
    $.ajax({
      url: url,
      dataType: 'json',
      method: 'GET',
      success: (data) => {
        if (!!loadingAction) {
          dispatch(loadingAction(false));
        }
        
        return dispatch(successAction(data));
      },
      error: (xhr, status, err) => {
        if (!!loadingAction) {
          dispatch(loadingAction(false));
        }
        return dispatch(errorAction(err));
      }
    })
  };
}

export function postData(url, data, successAction, errorAction) {
  return function (dispatch) {
    $.ajax({
     url: url,
     dataType: 'json',
     method: 'POST',
     data: data,
     success: (data) => {
       return dispatch(successAction());
     },
     error: (xhr, status, err) => {
       return dispatch(errorAction(err));
     }
   });
  }
}

export function addError(error) {
  return {
    type: types.ADD_ERROR,
    errorMsg: error
  }
}

export function removeError() {
  return {
    type: types.REMOVE_ERROR
  }
}