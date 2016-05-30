import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { syncHistoryWithStore } from 'react-router-redux';

// / Import components
import Playlist from './components/Playlist.jsx'; // eslint-disable-line no-unused-vars
import PlaylistMenu from './components/PlaylistMenu.jsx'; // eslint-disable-line no-unused-vars
import PlaylistForm from './containers/PlaylistForm.jsx'; // eslint-disable-line no-unused-vars

import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import store from './store/Store.jsx';

const history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
  constructor() {
    super();
  }
  
  render () {
    return (
      <div>
        <PageHeader>
          MusicShare <small>Share your music with friends from any music provider</small>
        </PageHeader>
        <Grid fluid={true}>
          <Row>
            <Col md={2}>
              <PlaylistMenu/>
            </Col>
            <Col md={10}>
              {this.props.children}
            </Col>
          </Row>
        </Grid> 
      </div>
    )
  }
}

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
