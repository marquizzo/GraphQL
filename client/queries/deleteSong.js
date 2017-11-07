import gql from 'graphql-tag';

export default gql`
  mutation DeleteSong($songID:ID){
    deleteSong(id:$songID){
      id
    }
  }
`;