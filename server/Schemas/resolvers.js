const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.findOne({_id: "62100875d0f40c38d408b634"})
        }
    },

    Mutation: {
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            const token = signToken(user);
            console.log (user)
            console.log(token);
            return { token, user };
        },
        addUser: async (parent, body) => {
            return User.create(body);
        },
        // saveBook: async () => {},
        // removeBook: async () => {},
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
