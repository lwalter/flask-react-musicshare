import React from 'react';
import $ from 'jquery';
import { FormGroup, Button, FormControl, Row, Col } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { addPlaylist } from '../actions/ActionCreators.jsx';

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
    this.props.dispatch(addPlaylist(this.state.title));
    /*
    e.preventDefault();
    var title = this.state.title;
    
    if (!title) {
      return;
    }
    
    $.ajax({
      url: '/api/playlist',
      dataType: 'json',
      method: 'POST',
      data: { title: title },
      success: (data) => {
        console.log('Success');
      },
      error: (xhr, status, err) => {
        console.log('Error');
      }
    });
    */
    
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
                <FormControl name="title" placeholder="Enter playlist title" type="text" required value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
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

export default connect()(PlaylistForm);