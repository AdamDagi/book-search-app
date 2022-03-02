const { User } = require('../models');
const { signToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const resolvers = {
    Query: {
        me: async (parent, { token }) => {
            console.log("kisunia1");
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            console.log(data);
            const user = await User.findOne({_id: data._id});
            console.log("modelUSER");
            console.log(user);
            return user;
        }
    },

    Mutation: {
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, {authors, description, title, bookId, image, link, token}) => {
            console.log(authors);
            const body = {authors, description, title, bookId, image, link};
            console.log(body);
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            const user = await User.findOneAndUpdate(
                { _id: data._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            console.log(user);
            return user;
        },
        // removeBook: async (parent, {bookId}) => {
        //     const user = User.findOneAndUpdate(bookId);
        //     const token = signToken(user);
        //     return { token, user };
        // }
    },
};

module.exports = resolvers;
