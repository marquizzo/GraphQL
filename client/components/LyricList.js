import React, {Component} from 'react';
import {graphql} from 'react-apollo';

import mutationLikeLyric from '../queries/likeLyric';

class LyricList extends Component{
  onLyricLike(id, likes){
    this.props.mutate({
      variables: {lyricID: id},
      
      // fakes the response from the server to temporarily update UI
      // until server responds
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          likes: likes + 1,
          __typename: 'LyricType'
        }
      }
    });
  };

  renderLyrics(){
    return this.props.lyrics.map(({id, content, likes}) => {
      return(
        <li className="collection-item" key={id}>
          {content}
          <i 
            className="material-icons right"
            onClick={() => this.onLyricLike(id, likes)}
          >
            thumb_up
          </i>
          <span className="right">{likes}</span>
        </li>
      )
    });
  };

  render(){
    return(
      <ul className="collection">{this.renderLyrics()}</ul>
    );
  }
};

export default graphql(mutationLikeLyric)(LyricList);