import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me($token: String){
    me(token: $token){
      _id
      username
      email
      savedBooks { 
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
