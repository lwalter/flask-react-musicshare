import { createStore, combineReducers, applyMiddleware } from 'redux';
import playlists from '../reducers/Playlists.jsx';
import { routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';

let logger = createLogger();
let store = createStore(
  combineReducers({
    playlistReducer: playlists,
    routing: routerReducer
  }),
  applyMiddleware(logger)
);

export default store;
