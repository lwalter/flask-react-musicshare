import { createStore, combineReducers, applyMiddleware } from 'redux';
import { playlists, playlistSongs, playlistsLoading, playlistSongsLoading } from '../reducers/Playlists.jsx';
import { errors } from '../reducers/Errors.jsx';
import { routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

let logger = createLogger();
let store = createStore(
  combineReducers({
    playlists: playlists,
    playlistSongs: playlistSongs,
    error: errors,
    playlistsLoading: playlistsLoading,
    playlistSongsLoading: playlistSongsLoading,
    routing: routerReducer
  }),
  applyMiddleware(thunk, logger)
);

export default store;
