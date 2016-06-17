import * as types from '../constants/ActionTypes.jsx';
import $ from 'jquery';

export function addPlaylist(title) {
  return {
    type: types.ADD_PLAYLIST,
    title: title
  }
}

export function fetchPlaylistsSuccessful(data) {
  return {
    type: types.FETCH_PLAYLISTS,
    playlists: data.playlists
  }
}

export function getData(url, successAction, errorAction) {
  return function (dispatch) {
    $.ajax({
      url: url,
      dataType: 'json',
      method: 'GET',
      success: (data) => {
        return dispatch(successAction(data));
      },
      error: (xhr, status, err) => {
        return dispatch(errorAction(err));
      }
    })
  }
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