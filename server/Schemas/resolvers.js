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
        // saveBook: async (parent, {authors, description, title, bookId, image, link}) => {
        //     const user = User.findOneAndUpdate(authors, description, title, bookId, image, link);
        //     const token = signToken(user);
        //     return { token, user };
        // },
        // removeBook: async (parent, {bookId}) => {
        //     const user = User.findOneAndUpdate(bookId);
        //     const token = signToken(user);
        //     return { token, user };
        // },
        // addThought: async (parent, { thoughtText, thoughtAuthor }) => {
        //     return Thought.create({ thoughtText, thoughtAuthor });
        // },
        // addComment: async (parent, { thoughtId, commentText }) => {
        //     return Thought.findOneAndUpdate(
        //     { _id: thoughtId },
        //     {
        //         $addToSet: { comments: { commentText } },
        //     },
        //     {
        //         new: true,
        //         runValidators: true,
        //     }
        //     );
        // },
        // removeThought: async (parent, { thoughtId }) => {
        //     return Thought.findOneAndDelete({ _id: thoughtId });
        // },
        // removeComment: async (parent, { thoughtId, commentId }) => {
        //     return Thought.findOneAndUpdate(
        //     { _id: thoughtId },
        //     { $pull: { comments: { _id: commentId } } },
        //     { new: true }
        //     );
        // },
    },
};

module.exports = resolvers;
