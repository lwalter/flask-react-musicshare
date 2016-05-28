import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

class SongListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <ListGroupItem header={this.props.song.title}>
        <span>
          {this.props.song.artist}
          <button onClick={this.props.deleteSong}>Delete song</button>
        </span>
      </ListGroupItem>
    )
  }
}

export default SongListItem;