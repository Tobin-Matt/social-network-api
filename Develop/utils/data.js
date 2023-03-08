const users = [
    {
        username: "janedoe",
        email: "janedoe@gmail.com"
    },
    {
        username: "johndoe", 
        email: "johndoe@gmail.com"
    },
    {
        username: "mikejones", 
        email: "mikejones@gmail.com"
    },
    {
        username: "sarahlee", 
        email: "sarahlee@gmail.com"
    },
    {
        username: "robertdavis", 
        email: "robertdavis@gmail.com"
    }
];

const thoughts = [
    {
        thoughtText: "Life is too short to waste time on things you don't love."
    },
    {
        thoughtText: "You are the only one who can truly define your own success."
    },
    {
        thoughtText: "The most valuable things in life can't be bought."
    },
    {
        thoughtText: "The greatest risk in life is not taking one."
    },
    {
        thoughtText: "It's not the years in your life that count, it's the life in your years."
    }
];

const reactions = [
    {
        reactionBody: "So true!"
    },
    {
        reactionBody: "Love this!"
    },
    {
        reactionBody: "I completely agree"
    },
    {
        reactionBody: "This made me smile :)"
    },
    {
        reactionBody: "Interesting perspective"
    }
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomThought = () => getRandomArrItem(thoughts).thoughtText;

const getRandomUser = () => getRandomArrItem(users);

module.exports = { getRandomThought, getRandomUser, getRandomArrItem };