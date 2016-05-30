import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars

// / Import components
import Playlist from './components/Playlist.jsx'; // eslint-disable-line no-unused-vars
import PlaylistMenu from './components/PlaylistMenu.jsx'; // eslint-disable-line no-unused-vars
import PlaylistForm from './components/PlaylistForm.jsx'; // eslint-disable-line no-unused-vars

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
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="create-playlist" component={PlaylistForm}/>
      <Route path="playlist/:playlistId" component={Playlist}/>
    </Route>
  </Router>
), document.getElementById('app'));
