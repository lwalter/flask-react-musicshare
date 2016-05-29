import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

// / Import components
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
