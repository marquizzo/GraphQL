import gql from 'graphql-tag';

export default gql`
  mutation LikeLyric($lyricID:ID!){
    likeLyric(id:$lyricID){
      id
      likes
    }
  }
`;