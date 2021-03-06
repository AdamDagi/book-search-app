const { User } = require('../models');
const { signToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const resolvers = {
    Query: {
        me: async (parent, { token }) => {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            const user = await User.findOne({_id: data._id});
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
            const body = {authors, description, title, bookId, image, link};
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            const user = await User.findOneAndUpdate(
                { _id: data._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            return user;
        },
        removeBook: async (parent, {bookId, token}) => {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            const updatedUser = await User.findOneAndUpdate(
                { _id: data._id },
                { $pull: { savedBooks: {bookId} } },
                { new: true }
            );
            return updatedUser;
        }
    },
};

module.exports = resolvers;
