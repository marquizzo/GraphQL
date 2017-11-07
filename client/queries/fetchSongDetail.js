import gql from 'graphql-tag';

export default gql `
  query SongDetails($songID: ID!){
    song(id:$songID){
      title
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;