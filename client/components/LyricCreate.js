import React, {Component} from 'react';
import {graphql} from 'react-apollo';

import mutationAddLyric from '../queries/addLyric';

class LyricCreate extends Component{
  constructor(props){
    super(props);

    this.state = {content: ''};
  };

  onSubmit(event){
    event.preventDefault();

    this.props.mutate({
      variables: {
        songID: this.props.songID,
        lyric: this.state.content
      }
    })
      .then(() => null);

    this.setState({content: ''})
  };

  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a lyric</label>
        <input 
          value={this.state.content}
          onChange={event => this.setState({content: event.target.value})}
        />
      </form>
    );
  }
}

export default graphql(mutationAddLyric)(LyricCreate);