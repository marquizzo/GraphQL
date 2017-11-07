import React, {Component} from 'react';
import {graphql} from 'react-apollo'; // Helps access data with queries
import {Link} from 'react-router';    // Link tag from react-router lib
import queryFetchSongs from '../queries/fetchSongs';
import mutationDeleteSong from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(id){
    this.props.mutate({
      variables: {songID: id}
    })
      .then( () => this.props.data.refetch());  // Fetches songs after mutation is complete
  };

  renderSongs(){
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i className="material-icons right" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  };

  render(){
    if(this.props.data.loading){
      return (<div>Loading...</div>);
    }else{
      return(
        <div>
          <ul className="collection">
            {this.renderSongs()}
          </ul>
          <Link
            to="/songs/new"
            className="btn-floating btn-large red right"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    }
  }
}

// graphql() performs query, and re-renders with .data within this.props.
export default graphql(mutationDeleteSong)(
  graphql(queryFetchSongs)(SongList)
);