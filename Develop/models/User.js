const { Schema, model } = require('mongoose');

//regex to validate email matches the correct input
var validateEmail = (email) => {
    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email)
};

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: true,
            validate: [validateEmail, 'Please input a valid email address'],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please input a valid email address'],
        },
        //array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        //array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

//virtual that retrieves the length of the user's 'friends' array field on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;