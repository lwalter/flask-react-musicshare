import { createStore, combineReducers } from 'redux';
import playlists from '../reducers/Playlists.jsx';
import initialState from './InitialState.jsx';
import { routerReducer } from 'react-router-redux';

let store = createStore(
  combineReducers({
    playlists: playlists,
    routing: routerReducer
  }), 
  initialState, 
  window.devToolsExtension && window.devToolsExtension()
);
export default store;
