import React, {Component} from 'react';
import gql from 'graphql-tag';
import{graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import queryFetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props){
    super(props);

    this.state = {title: ''};
  };

  // Triggered on hitting Enter key
  onSubmit(event){
    event.preventDefault();

    // Execute mutation with title variable
    this.props.mutate({
      variables: {title: this.state.title},
      refetchQueries: [{query: queryFetchSongs}]  // Fetches songs after mutation is complete
    })
      .then(() => hashHistory.push("/"))   // Triggered upon GQL server response
      .catch(() => null); // Good for validation errors from backend
  };

  render(){
    return(
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          {/*Controlled form component watches for change event and updates component-level State*/}
          <input 
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

// We need Query variables if we don't want to hard-code attributes
const mutationAddSong = gql`
  mutation AddSong($title:String){
    addSong(title: $title){
      id,
      title
    }
  }
`;

export default graphql(mutationAddSong)(SongCreate);