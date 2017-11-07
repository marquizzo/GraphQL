import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

import queryFetchSongDetail from '../queries/fetchSongDetail';

class SongDetail extends Component {
  render(){
    const {song} = this.props.data;
    if(!song){
      return (
          <div>
            <Link to="/">Back</Link>
            <h3>Loading...</h3>
          </div>
        );
    }else{
      return(
        <div>
          <Link to="/">Back</Link>
          <h3>{song.title}</h3>
          <LyricList lyrics={song.lyrics}/>
          <LyricCreate songID={this.props.params.songID}/>
        </div>
      );
    }
  }
}

export default graphql(queryFetchSongDetail, {
  // Use this to pass songID into the query
  // GraphQL gets props param intended for Component
  options: (props) => {return {variables: {songID: props.params.songID}}}
})(SongDetail);