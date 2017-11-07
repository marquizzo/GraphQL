import gql from 'graphql-tag';

export default gql`
  mutation AddLyric($lyric:String!, $songID:ID!){
    addLyricToSong(content: $lyric, songId:$songID){
      id
      lyrics{
        id
        content
        likes
      }
    }
  }
`;