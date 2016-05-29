import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

class SongListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <ListGroupItem header={this.props.song.title}>
        <span>
          {this.props.song.artist}
          <Button onClick={this.props.deleteSong} bsStyle="primary">Delete song</Button>
        </span>
      </ListGroupItem>
    )
  }
}

export default SongListItem;