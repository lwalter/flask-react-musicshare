import React from 'react';
import $ from 'jquery';
import { Button, Modal, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import SongSearchResults from './SongSearchResults.jsx';

class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      url: '',
      title: '',
      searchResults: []
    });
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.submitSong = this.submitSong.bind(this);
  }

  // TODO(should probably refactor these to a generic method)
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  
  querySongs(e) {
    e.preventDefault();
    
    const title = this.state.title;
    
    if (!title || typeof title !== 'string' || title === '') {
      return;
    }
    
    $.ajax({
      url: 'songs/search',
      dataType: 'json',
      method: 'POST',
      data: { title: title },
      success: (response) => {
        console.log(response);
        this.setState({ searchResults: response.tracks.items });
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  }
  
  closeSongForm() {
    this.setState({
      searchResults: [],
      title: '',
      url: ''
    });
    this.props.hide();
  }

  submitSong() {
    var url = this.state.url;
    var title = this.state.title;
    
    if (!url && !title) {
      return;
    }

    var data = {};
    if (url) {
      Object.assign(data, { url: url });
    }

    if (title) {
      Object.assign(data, { title: title });
    }

    $.ajax({
      url: '/api/playlist/' + this.props.playlist + '/song',
      dataType: 'json',
      method: 'POST',
      data: data,
      success: (data) => {
        console.log("Success");
        console.log(data);
      },
      error: (xhr, status, err) => {
        console.log("Error");
        console.log(status, err.toString());
      }
    });

    this.setState({
      url: '',
      title: ''
    });
  }

  render () {
    return (
      <Modal show={this.props.show} onHide={this.closeSongForm.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Search for a song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="searchForm">
              <Row>
                <Col md={5}>
                  <FormControl name="title" placeholder="Enter song title" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                </Col>
                <Col md={2}>
                  <p>Or..</p>
                </Col>
                <Col md={5}>
                  <FormControl name="url" placeholder="Enter YouTube url" type="text" value={this.state.url} onChange={this.handleUrlChange}/>
                </Col>
              </Row>
            </FormGroup>
            <Button bsStyle="primary" onClick={this.querySongs.bind(this)}>Search</Button>
          </form>
          <Row>
            <Col md={12}>
              <SongSearchResults songs={this.state.searchResults} submitSong={this.submitSong.bind(this)} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SongForm;
