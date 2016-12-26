import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars

import store from './store/Store.jsx';
import App from './containers/App.jsx'; // eslint-disable-line no-unused-vars
import Playlist from './components/Playlist.jsx'; // eslint-disable-line no-unused-vars
import PlaylistForm from './containers/PlaylistForm.jsx'; // eslint-disable-line no-unused-vars
import Playlist1C from './containers/Playlist1C.jsx'; //eslint-disable-line no-unused-vars

const history = syncHistoryWithStore(hashHistory, store);


/*        <Route path="playlist/:playlistId" component={Playlist}/>*/

// TODO(lnw) replace Playlist component with new Playist1 container
render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="create-playlist" component={PlaylistForm}/>
        <Route path="playlist/:playlistId" component={Playlist}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
