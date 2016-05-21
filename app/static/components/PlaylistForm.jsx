import React from 'react';
import $ from 'jquery';

class PlaylistForm extends React.Component {
  constructor() {
    super();
    this.state = { title: '' }; 
  }
 
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  
  submitPlaylist(e) {
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
    
    this.setState({ title: '' });
  }
  
  render() {
    return (
      <form onSubmit={this.submitPlaylist.bind(this)}>
        <label for="title">Title</label>
        <input name="title" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
        <button type="submit">Add playlist</button>
      </form>
    )
  }
}

export default PlaylistForm;