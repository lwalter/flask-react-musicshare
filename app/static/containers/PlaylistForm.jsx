import React from 'react';
import { FormGroup, Button, FormControl, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPlaylist, postData, addPlaylistSuccess, addPlaylistError } from '../actions/ActionCreators.jsx';

class PlaylistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }
 
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  
  submitPlaylist(e) {
    e.preventDefault();
    this.props.actions.addPlaylist(this.state.title);
    
    this.props.actions.postData(
      '/api/playlist', 
      { title: this.state.title },
      addPlaylistSuccess,
      addPlaylistError
    );
    
    this.setState({ title: '' });
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col md={4}>
            <h2>Create a new playlist</h2>
            <form onSubmit={this.submitPlaylist.bind(this)}>
              <FormGroup controlId="playlistForm">
                <FormControl 
                  name="title" 
                  placeholder="Enter playlist title" 
                  type="text" 
                  required 
                  value={this.state.title} 
                  onChange={this.handleTitleChange.bind(this)}/>
                <FormControl.Feedback />
              </FormGroup>
              <Button type="submit">Add playlist</Button>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

PlaylistForm.propTypes = {
  actions: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addPlaylist, postData }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PlaylistForm);