import React from 'react';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

class SongSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  addSong() {
    
  }
  
  

  render() {
    var i = 0;
    var resultItems = this.props.songs.map((song) => {
      var artists = '';
      for (var index = 0; index < song.artists.length; index++) {
        artists += song.artists[index].name;
        
        if (index + 1 !== song.artists.length) {
          artists += ', ';
        }
      }
      
      var item = (
        <ListGroupItem key={i} onClick={this.addSong.bind(this)}>
          {song.name}: {artists}
        </ListGroupItem>
      );
      i++;
      
      return item;
    });
    
    return (
      <ListGroup>
        {resultItems}
      </ListGroup>
    )
  }
}

export default SongSearchResults;