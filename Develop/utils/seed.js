const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomThought, getRandomUser, getRandomArrItem } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected');

    //drop any existing Users or Thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    //empty array to hold the users
    const users = [];

    //loop to add users to the users array
    //username, email, thoughts, friends
    for (let i = 0; i < 5; i++) {
        const user = getRandomUser();
        const username = user.username;
        const email = user.email;
        const thoughts = getRandomThought();

        //create a random number of friends for each user
        const numFriends = Math.floor(Math.random() * (users.length + 1));
        const friends = getRandomArrItem(users, numFriends).map(user => user.username);

        users.push({
            username,
            email,
            thoughts,
            friends,
        });
    }

    //add thoughts to the Thought collection before users are added to User collection
    await Thought.collection.insertMany(getRandomThought());
    
    //add users to the User collection
    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding complete');
    process.exit(0);
});