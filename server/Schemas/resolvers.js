const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.findOne({_id: "62100875d0f40c38d408b634"})
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
            const user = await User.findOneAndUpdate({token}, {savedBooks:{authors, description, title, bookId, image, link}});
            
            return { ok: true };
        },
        // removeBook: async (parent, {bookId}) => {
        //     const user = User.findOneAndUpdate(bookId);
        //     const token = signToken(user);
        //     return { token, user };
        // }
    },
};

module.exports = resolvers;
