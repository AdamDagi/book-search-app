const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: Int
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    
    type Auth {
        token: String
        user: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, title: String!, bookId: Int!, image: String!, link: String!): User
        removeBook(bookId: Int!): User
    }
`;

module.exports = typeDefs;