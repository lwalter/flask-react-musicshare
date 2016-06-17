import React from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import PlaylistMenu from '../containers/PlaylistMenu.jsx'; // eslint-disable-line no-unused-vars
import Error from '../containers/Error.jsx'; // eslint-disable-line no-unused-vars

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderError() {
    // TODO(lnw) Actually access the error on the store and modify the Error container to show alert style.
    // Might need to have a container/component pair for App.
    return (!!this.props.errorMsg && this.props.errorMsg.length > 0) ? (<Error />) : null;
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
              <PlaylistMenu />
            </Col>
            <Col md={10}>
              {this.renderError()}
              {this.props.children}
            </Col>
          </Row>
        </Grid> 
      </div>
    )
  }
}

export default App;
