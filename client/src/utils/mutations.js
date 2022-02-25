import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String!], $description: String!, $title: String!, $bookId: String!, $image: String!, $link: String!, $token: String!) {
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link, token: $token) {
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

// export const REMOVE_BOOK = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
