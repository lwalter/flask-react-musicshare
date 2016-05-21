import React from 'react';

class SongListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <li>
        <span>{this.props.song.title}: {this.props.song.artist}</span>
        <button onClick={this.props.deleteSong}>Delete song</button>
      </li>
    )
  }
}

export default SongListItem;