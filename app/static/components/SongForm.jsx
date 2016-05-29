import React from 'react';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';

class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      url: '',
      title: ''
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

  submitSong(e) {
    e.preventDefault();
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
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Search for a song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitSong}>
            <label for="title">Title</label>
            <input name="title" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
            <p>Or..</p>
            <label for="url">Url</label>
            <input name="url" type="text" value={this.state.url} onChange={this.handleUrlChange}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" bsStyle="primary">Add song</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SongForm;
