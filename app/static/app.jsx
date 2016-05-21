import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// Import components
import Playlist from './components/Playlist.jsx';
import PlaylistMenu from './components/PlaylistMenu.jsx';
import PlaylistForm from './components/PlaylistForm.jsx';

class App extends React.Component {
  constructor() {
    super();
  }
  
  render () {
    return (
      <div>
        <div>
          <h1>Welcome to MusicShare</h1>
          <h4>Share your music with friends from any music provider</h4> 
        </div>
        <div>
          <PlaylistMenu/>
        </div>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="create-playlist" component={PlaylistForm}/>
      <Route path="playlist/:playlistId" component={Playlist}/>
    </Route>
  </Router>
), document.getElementById('app'));
