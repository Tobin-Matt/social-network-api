const { Schema, model } = require('mongoose');

//use a regex to validate email matches the correct input
var validateEmail = (email) => {
    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email)
};

const userSchema = new Schema(
    {
        //string, unique, required, trimmed
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        //string, required, unique, must match valid email address --> Mongoose matching validation
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
                ref: 'Thought',
            },
        ],
        //array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

//create a virtual called "friendCount" that retrieves the length of the user's 'friends' array field on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;